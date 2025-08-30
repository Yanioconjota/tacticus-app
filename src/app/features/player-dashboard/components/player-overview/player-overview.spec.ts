import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerOverview } from './player-overview';

describe('PlayerOverview', () => {
  let component: PlayerOverview;
  let fixture: ComponentFixture<PlayerOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
