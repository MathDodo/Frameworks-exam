import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationSuccesComponent } from './registration-succes.component';

describe('RegistrationSuccesComponent', () => {
  let component: RegistrationSuccesComponent;
  let fixture: ComponentFixture<RegistrationSuccesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationSuccesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationSuccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
