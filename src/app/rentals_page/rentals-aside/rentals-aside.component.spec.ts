import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsAsideComponent } from './rentals-aside.component';

describe('RentalsAsideComponent', () => {
  let component: RentalsAsideComponent;
  let fixture: ComponentFixture<RentalsAsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalsAsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalsAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
