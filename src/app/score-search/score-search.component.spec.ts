import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreSearchComponent } from './score-search.component';

describe('ScoreSearchComponent', () => {
  let component: ScoreSearchComponent;
  let fixture: ComponentFixture<ScoreSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreSearchComponent]
    });
    fixture = TestBed.createComponent(ScoreSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
