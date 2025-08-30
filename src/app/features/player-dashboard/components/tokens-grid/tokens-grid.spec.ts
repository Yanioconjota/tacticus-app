import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokensGridComponent } from './tokens-grid';

describe('TokensGrid', () => {
  let component: TokensGridComponent;
  let fixture: ComponentFixture<TokensGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokensGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokensGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
