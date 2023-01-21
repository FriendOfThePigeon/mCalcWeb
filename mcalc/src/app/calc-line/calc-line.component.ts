import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CalcLineService } from '../calc-line.service';
import { CalcLine } from '../calc-line';

@Component({
  selector: 'app-calc-line',
  templateUrl: './calc-line.component.html',
  styleUrls: ['./calc-line.component.css'],
	
})


export class CalcLineComponent {

	@Input() line?: CalcLine;

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private calcLineService: CalcLineService,
	) {}

	ngOnInit(): void {
		this.getLine();
	}

	goBack(): void {
		this.location.back();
	}

	getLine(): void {
		const id = Number(this.route.snapshot.paramMap.get('id'));
		this.calcLineService.getLine(id)
			.subscribe(line => this.line = line);
	}

	save(): void {
		if (this.line) {
			this.calcLineService.updateLine(this.line)
			.subscribe(() => this.goBack());
		}
	}
}
