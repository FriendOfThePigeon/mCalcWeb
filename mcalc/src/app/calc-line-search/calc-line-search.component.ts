import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { CalcLine } from '../calc-line';
import { CalcLineService } from '../calc-line.service';

@Component({
  selector: 'app-calc-line-search',
  templateUrl: './calc-line-search.component.html',
  styleUrls: [ './calc-line-search.component.css' ]
})
export class CalcLineSearchComponent implements OnInit {
  results$!: Observable<CalcLine[]>;

  private searchTerms = new Subject<string>();

  constructor(private linesService: CalcLineService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.results$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.linesService.searchLines(term)),
    );
  }
}
