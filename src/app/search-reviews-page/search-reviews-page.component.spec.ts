import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReviewsPageComponent } from './search-reviews-page.component';

describe('SearchReviewsPageComponent', () => {
  let component: SearchReviewsPageComponent;
  let fixture: ComponentFixture<SearchReviewsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchReviewsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchReviewsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
