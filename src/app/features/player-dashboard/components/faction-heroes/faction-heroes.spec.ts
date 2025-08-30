import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactionHeroesComponent } from './faction-heroes';

describe('FactionHeroes', () => {
  let component: FactionHeroesComponent;
  let fixture: ComponentFixture<FactionHeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactionHeroesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactionHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
