import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactionSection } from './faction-section';

describe('FactionSection', () => {
  let component: FactionSection;
  let fixture: ComponentFixture<FactionSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactionSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactionSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
