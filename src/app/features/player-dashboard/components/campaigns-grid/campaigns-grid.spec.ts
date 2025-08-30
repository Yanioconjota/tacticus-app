import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsGridComponent } from './campaigns-grid';

describe('CampaignsGrid', () => {
  let component: CampaignsGridComponent;
  let fixture: ComponentFixture<CampaignsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignsGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
