import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokensGrid } from './tokens-grid';

describe('TokensGrid', () => {
  let component: TokensGrid;
  let fixture: ComponentFixture<TokensGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokensGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokensGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
