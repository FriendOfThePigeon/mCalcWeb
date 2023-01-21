import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcLineComponent } from './calc-line.component';

describe('CalcLineComponent', () => {
  let component: CalcLineComponent;
  let fixture: ComponentFixture<CalcLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalcLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
