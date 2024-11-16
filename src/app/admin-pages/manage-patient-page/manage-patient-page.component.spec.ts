import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePatientPageComponent } from './manage-patient-page.component';

describe('ManagePatientPageComponent', () => {
  let component: ManagePatientPageComponent;
  let fixture: ComponentFixture<ManagePatientPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagePatientPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePatientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
