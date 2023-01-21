import { TestBed } from '@angular/core/testing';

import { CalcLineService } from './calc-line.service';

describe('CalcLineService', () => {
  let service: CalcLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalcLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
