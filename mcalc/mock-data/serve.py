#!/usr/bin/env python3

import json
from http.server import HTTPServer, BaseHTTPRequestHandler # SimpleHTTPRequestHandler
import re

INIT_DATA = [
  { 'id': 12, 'name': 'Dr. Nice' },
  { 'id': 13, 'name': 'Bombasto' },
  { 'id': 14, 'name': 'Celeritas' },
  { 'id': 15, 'name': 'Magneta' },
  { 'id': 16, 'name': 'RubberMan' },
  { 'id': 17, 'name': 'Dynama' },
  { 'id': 18, 'name': 'Dr. IQ' },
  { 'id': 19, 'name': 'Magma' },
  { 'id': 20, 'name': 'Tornado' }
]

_data = { each['id']: each for each in INIT_DATA }

re_cid = re.compile(r'^/([0-9]+)$')

class MockCalcsHandler(BaseHTTPRequestHandler):
    def __init__(self, request, client_address, server):
        super().__init__(request, client_address, server)

    def send_ok_headers(self, code=200):
        self.send_response(code)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "*")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Content-type", "application/json")
        self.end_headers()

    def do_OPTIONS(self):
        self.send_ok_headers(code=204)

    def do_HEAD(self):
        self.send_ok_headers()

    def do_GET(self):
        if self.path in ['', '/']:
            self.send_ok_headers(204)
            return
        elif self.path.startswith('/?name='):
            self.send_search_results(self.path[7:])
            return
        elif self.path == '/favicon.ico':
            self.send_error(404)
            return
        elif self.path == '/all':
            self.send_all()
            return
        try:
            m = re_cid.fullmatch(self.path)
            if not m:
                raise ValueError('Invalid path: "%s"' % (self.path))
            item = _data[int(m.group(1))]
            self.send_one(item)
        except ValueError as ex:
            print(ex)
            self.send_error(400)
        except KeyError as ex:
            print(ex)
            self.send_error(404)

    def do_PUT(self):
        if self.path in ['', '/']:
            self.send_error(400)
            return
        try:
            m = re_cid.fullmatch(self.path)
            if not m:
                raise ValueError('Invalid path: "%s"' % (self.path))
            item = _data[int(m.group(1))]
            self.update_one(item=item)
        except ValueError as ex:
            print(ex)
            self.send_error(400)
        except KeyError as ex:
            print(ex)
            self.send_error(404)

    def do_POST(self):
        try:
            self.insert_one()
        except ValueError as ex:
            print(ex)
            self.send_error(400)
        except KeyError as ex:
            print(ex)
            self.send_error(404)

    def do_DELETE(self):
        try:
            m = re_cid.fullmatch(self.path)
            if not m:
                raise ValueError('Invalid path: "%s"' % (self.path))
            item = _data[int(m.group(1))]
            self.delete_one(item=item)
        except ValueError as ex:
            print(ex)
            self.send_error(400)
        except KeyError as ex:
            print(ex)
            self.send_error(404)

    def send_one(self, item): 
        self.send_ok_headers()
        self.wfile.write(json.dumps(item).encode('utf-8'))

    def send_all(self): 
        self.send_ok_headers()
        self.wfile.write(json.dumps(list(_data.values())).encode('utf-8'))

    def get_header_brute(self, key):
        for each in self.headers:
            if each.startswith(key):
                print('Found %s header: %s' % (key, each))
                return each[len(key) + 1:]
        raise KeyError('No such header: %s' % (key))

    def update_one(self, item=None):
        print('update_one')
        try:
            length = int(self.headers.get('Content-Length'))
            body = self.rfile.read(length)  # FIXME
            content = json.loads(body.decode('utf-8'))
            pay = {k: content[k] for k in ['id', 'name']}
            if item:
                if item['id'] != pay['id']:
                    raise ValueError('ID mismatch')
                for k, v in pay.items():
                    item[k] = v
            else:
                if pay['id'] in _data:
                    raise ValueError('Already exists')
                _data[pay['id']] = pay
            self.send_one(pay)
        except ValueError as ex:
            print('Invalid content length: %s' % (ex))
            self.send_error(400)
        except Exception as ex:
            print(ex)
            self.send_error(400)
           
    def next_id(self):
        if not _data:
            return 1
        taken = sorted(_data.keys())
        return taken[-1] + 1

    def insert_one(self):
        print('insert_one')
        try:
            length = int(self.headers.get('Content-Length'))
            body = self.rfile.read(length)  # FIXME
            content = json.loads(body.decode('utf-8'))
            pay = {k: content[k] for k in ['name']}
            pay['id'] = self.next_id()
            _data[pay['id']] = pay
            self.send_one(pay)
        except ValueError as ex:
            print('Invalid content length: %s' % (ex))
            self.send_error(400)
        except Exception as ex:
            print(ex)
            self.send_error(400)
            
    def delete_one(self, item=None):
        print('delete_one')
        try:
            del _data[item['id']]
            self.send_ok_headers(code=204)
        except ValueError as ex:
            print('Invalid content length: %s' % (ex))
            self.send_error(400)
        except Exception as ex:
            print(ex)
            self.send_error(400)
           
    def send_search_results(self, term):
        print('searching for "%s"' % (term))
        found = [v for v in _data.values() if term in v['name']]
        self.send_ok_headers()
        self.wfile.write(json.dumps(found).encode('utf-8'))

# def main(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler):
def main(server_class=HTTPServer, handler_class=MockCalcsHandler):
    server_address = ('', 4201)
    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()


if __name__ == '__main__':
    main()
