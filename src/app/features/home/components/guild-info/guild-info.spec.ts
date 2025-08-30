import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildInfo } from './guild-info';

describe('GuildInfo', () => {
  let component: GuildInfo;
  let fixture: ComponentFixture<GuildInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuildInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuildInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
