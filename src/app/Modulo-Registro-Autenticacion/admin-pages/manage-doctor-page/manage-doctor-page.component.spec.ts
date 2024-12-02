import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDoctorPageComponent } from './manage-doctor-page.component';

describe('ManageDoctorPageComponent', () => {
  let component: ManageDoctorPageComponent;
  let fixture: ComponentFixture<ManageDoctorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDoctorPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDoctorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
