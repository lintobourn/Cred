import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WizardNavigationComponent } from '../../../../shared/components/wizard-navigation/wizard-navigation.component';

@Component({
  selector: 'app-dentist-demographics',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, WizardNavigationComponent],
  templateUrl: './dentist-demographics.component.html',
  styleUrl: './dentist-demographics.component.scss'
})
export class DentistDemographicsComponent {
  form: FormGroup;
  years: number[] = [];

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      dob: ['', Validators.required],
      ssn: ['', Validators.required],
      gender: ['', Validators.required],
      ethnicity: [''],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dentalSchool: ['', Validators.required],
      otherSchool: [''],
      yearGraduated: ['', Validators.required],
      specialty: ['', Validators.required]
    });

    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1950; i--) {
      this.years.push(i);
    }
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onNext() {
    // For testing purposes, allow navigation even if form is invalid
    // if (this.form.valid) {
    console.log('Form Data:', this.form.value);
    this.router.navigate(['/wizard/step-2'], { skipLocationChange: true });
    // } else {
    //   this.form.markAllAsTouched();
    // }
  }
}
