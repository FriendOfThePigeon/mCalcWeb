import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CalcLine } from './calc-line';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CalcLineService {
	private linesUrl = 'http://localhost:4201';  // URL to web api

	constructor(
		private http: HttpClient,
		private messageService: MessageService
	) { }

	private log(message: string) {
		this.messageService.add(`CalcLineService: ${message}`);
	}

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	getAll(): Observable<CalcLine[]> {
		const url = `${this.linesUrl}/all`;
		return this.http.get<CalcLine[]>(url)
			.pipe(
				tap(_ => this.log('fetched all')),
				catchError(this.handleError<CalcLine[]>('getAll', []))
			);
	}

	getLine(id: number): Observable<CalcLine> {
		const url = `${this.linesUrl}/${id}`;
		return this.http.get<CalcLine>(url).pipe(
			tap(_ => this.log(`fetched line id=${id}`)),
				catchError(this.handleError<CalcLine>(`getLine id=${id}`))
		);
	}

	updateLine(line: CalcLine): Observable<any> {
		const url = `${this.linesUrl}/${line.id}`;
		return this.http.put(url, line, this.httpOptions).pipe(
			tap(_ => this.log(`updated line id=${line.id}`)),
				catchError(this.handleError<any>('updateLine'))
		);
	}

	/** POST: add a new line to the server */
	addLine(line: CalcLine): Observable<CalcLine> {
		return this.http.post<CalcLine>(this.linesUrl, line, this.httpOptions).pipe(
			tap((newLine: CalcLine) => this.log(`added line w/ id=${newLine.id}`)),
				catchError(this.handleError<CalcLine>('addLine'))
		);
	}

	/** DELETE: delete the hero from the server */
	deleteLine(id: number): Observable<CalcLine> {
		const url = `${this.linesUrl}/${id}`;

		return this.http.delete<CalcLine>(url, this.httpOptions).pipe(
			tap(_ => this.log(`deleted line id=${id}`)),
				catchError(this.handleError<CalcLine>('deleteLine'))
		);
	}

	/* GET lines whose name contains search term */
	searchLines(term: string): Observable<CalcLine[]> {
		if (!term.trim()) {
			// if not search term, return empty array.
			return of([]);
		}
		return this.http.get<CalcLine[]>(`${this.linesUrl}/?name=${term}`).pipe(
			tap(x => x.length ?
				this.log(`found lines matching "${term}"`) :
				this.log(`no lines matching "${term}"`)),
			catchError(this.handleError<CalcLine[]>('searchLines', []))
		);
	}

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 *
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}
