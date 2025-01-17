import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceSelectorComponent } from './source-selector.component';

describe('SourceSelectorComponent', () => {
  let component: SourceSelectorComponent;
  let fixture: ComponentFixture<SourceSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SourceSelectorComponent]
    });
    fixture = TestBed.createComponent(SourceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
