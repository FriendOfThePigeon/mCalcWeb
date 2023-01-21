import { Component, OnInit } from '@angular/core';
import { CalcLine } from '../calc-line';
import { CalcLineService } from '../calc-line.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  lines: CalcLine[] = [];

  constructor(private calcLineService: CalcLineService) { }

  ngOnInit(): void {
    this.getLines();
  }

  getLines(): void {
    this.calcLineService.getAll()
      .subscribe(lines => this.lines = lines.slice(1, 5));
  }
}
