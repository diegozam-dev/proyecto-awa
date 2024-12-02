import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css'],
    standalone: false
})
export class LandingPageComponent implements OnInit {
  appointmentForm!: FormGroup;

  specialties = [
    'General Medicine',
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.appointmentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      specialty: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
