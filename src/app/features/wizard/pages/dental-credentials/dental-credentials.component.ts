import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WizardNavigationComponent } from '../../../../shared/components/wizard-navigation/wizard-navigation.component';

@Component({
  selector: 'app-dental-credentials',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, WizardNavigationComponent],
  templateUrl: './dental-credentials.component.html',
  styleUrl: './dental-credentials.component.scss'
})
export class DentalCredentialsComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      stateLicense: ['', Validators.required],
      cds: [null, Validators.required],
      dea: [null, Validators.required],
      painManagement: [''],
      cdsLicenseNo: [''],
      deaLicenseNo: [''],
      malpracticeInsurance: [''],
      carrierName: [''],
      policyHolder: [''],
      policyType: [null],
      limitPerClaim: [''],
      expirationDate: [''],
      limitAggregate: ['']
    });
  }

  onBack() {
    this.router.navigate(['/wizard/step-1'], { skipLocationChange: true });
  }

  onNext() {
    // For testing purposes, allow navigation even if form is invalid
    // if (this.form.valid) {
    console.log('Form Data:', this.form.value);
    this.router.navigate(['/wizard/step-3'], { skipLocationChange: true });
    // } else {
    //   this.form.markAllAsTouched();
    // }
  }
}
