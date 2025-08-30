import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressSummary } from './progress-summary';

describe('ProgressSummary', () => {
  let component: ProgressSummary;
  let fixture: ComponentFixture<ProgressSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
