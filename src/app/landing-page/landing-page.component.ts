import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  appointmentForm!: FormGroup;

  specialties = [
    'General Medicine',
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Pediatrics',
    'Orthopedics'
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.appointmentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      specialty: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      console.log('Form submitted:', this.appointmentForm.value);
      alert('Appointment scheduled successfully!');
      this.appointmentForm.reset();
    }
  }
}