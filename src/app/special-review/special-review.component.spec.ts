import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialReviewComponent } from './special-review.component';

describe('SpecialReviewComponent', () => {
  let component: SpecialReviewComponent;
  let fixture: ComponentFixture<SpecialReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
