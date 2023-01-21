import { Component } from '@angular/core';
import { CalcLine } from '../calc-line';
import { CalcLineService } from '../calc-line.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-calcs-list',
  templateUrl: './calcs-list.component.html',
  styleUrls: ['./calcs-list.component.css']
})

export class CalcsListComponent {
	lines: CalcLine[] = [];

	constructor(private calcLineService: CalcLineService, private messageService: MessageService ) {}

	ngOnInit(): void {
		this.getLines();
	}

	getLines(): void {
		this.calcLineService.getAll()
			.subscribe(resp => this.lines = resp);
	}

	addLine(name: string): void {
		name = name.trim();
		if (!name) { return; }
		this.calcLineService.addLine({ name } as CalcLine)
		.subscribe(line => {
			this.lines.push(line);
		});
	}

	deleteLine(line: CalcLine): void {
		this.lines = this.lines.filter(each => each !== line);
		this.calcLineService.deleteLine(line.id).subscribe();
	}

	/* selectedLine? : CalcLine;
	onSelect(line: CalcLine): void {
		this.selectedLine = line;
		this.messageService.add(`CalcsListComponent: Selected line id=${line.id}`);
	} */
}
