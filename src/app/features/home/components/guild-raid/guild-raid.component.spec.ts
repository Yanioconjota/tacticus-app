import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildRaidComponent } from './guild-raid.component';

describe('GuildRaid', () => {
  let component: GuildRaidComponent;
  let fixture: ComponentFixture<GuildRaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuildRaidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuildRaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
