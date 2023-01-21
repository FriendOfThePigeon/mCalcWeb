import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcsListComponent } from './calcs-list.component';

describe('CalcsListComponent', () => {
  let component: CalcsListComponent;
  let fixture: ComponentFixture<CalcsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalcsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
