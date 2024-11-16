import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateAppointmentComponent } from './generate-appointment.component';

describe('GenerateAppointmentComponent', () => {
  let component: GenerateAppointmentComponent;
  let fixture: ComponentFixture<GenerateAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
