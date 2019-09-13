import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsWrapperComponent } from './rentals-wrapper.component';

describe('RentalsWrapperComponent', () => {
  let component: RentalsWrapperComponent;
  let fixture: ComponentFixture<RentalsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalsWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
