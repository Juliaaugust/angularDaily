import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingMainComponent } from './housing-main.component';

describe('HousingMainComponent', () => {
  let component: HousingMainComponent;
  let fixture: ComponentFixture<HousingMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousingMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
