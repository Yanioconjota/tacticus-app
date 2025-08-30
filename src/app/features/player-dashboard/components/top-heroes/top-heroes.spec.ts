import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopHeroes } from './top-heroes';

describe('TopHeroes', () => {
  let component: TopHeroes;
  let fixture: ComponentFixture<TopHeroes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopHeroes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopHeroes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
