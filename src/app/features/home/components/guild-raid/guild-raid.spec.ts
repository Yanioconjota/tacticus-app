import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildRaid } from './guild-raid';

describe('GuildRaid', () => {
  let component: GuildRaid;
  let fixture: ComponentFixture<GuildRaid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuildRaid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuildRaid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
