import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactionSectionComponent } from './faction-section';

describe('FactionSection', () => {
  let component: FactionSectionComponent;
  let fixture: ComponentFixture<FactionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactionSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
