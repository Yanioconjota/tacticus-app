import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactionHeroes } from './faction-heroes';

describe('FactionHeroes', () => {
  let component: FactionHeroes;
  let fixture: ComponentFixture<FactionHeroes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactionHeroes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactionHeroes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
