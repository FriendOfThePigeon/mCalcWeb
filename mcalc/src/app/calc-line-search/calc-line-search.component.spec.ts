import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcLineSearchComponent } from './calc-line-search.component';

describe('CalcLineSearchComponent', () => {
  let component: CalcLineSearchComponent;
  let fixture: ComponentFixture<CalcLineSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcLineSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalcLineSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
