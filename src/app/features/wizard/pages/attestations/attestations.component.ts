import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WizardNavigationComponent } from '../../../../shared/components/wizard-navigation/wizard-navigation.component';

@Component({
    selector: 'app-attestations',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, WizardNavigationComponent],
    templateUrl: './attestations.component.html',
    styleUrl: './attestations.component.scss'
})
export class AttestationsComponent {
    form: FormGroup;

    constructor(private fb: FormBuilder, private router: Router) {
        this.form = this.fb.group({
            liabilityCoverageCancelled: [null],
            liabilityCoverageExplanation: [''], // Optional, shown if Yes is selected
            liabilityActions: [null],
            liabilityActionsExplanation: [''], // Optional, shown if Yes is selected
            certified: [false],
            fullName: ['']
        });
    }

    onBack() {
        this.router.navigate(['/wizard/step-3'], { skipLocationChange: true });
    }

    onNext() {
        if (this.form.valid) {
            console.log('Form Data:', this.form.value);
            this.router.navigate(['/wizard/step-5'], { skipLocationChange: true });
        } else {
            this.form.markAllAsTouched();
        }
    }
}
