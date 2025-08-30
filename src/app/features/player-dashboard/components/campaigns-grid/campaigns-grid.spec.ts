import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsGrid } from './campaigns-grid';

describe('CampaignsGrid', () => {
  let component: CampaignsGrid;
  let fixture: ComponentFixture<CampaignsGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignsGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignsGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
