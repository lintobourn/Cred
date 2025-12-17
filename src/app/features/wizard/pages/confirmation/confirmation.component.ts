import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WizardNavigationComponent } from '../../../../shared/components/wizard-navigation/wizard-navigation.component';

@Component({
    selector: 'app-confirmation',
    standalone: true,
    imports: [CommonModule, FormsModule, WizardNavigationComponent],
    templateUrl: './confirmation.component.html',
    styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent {
    formData = {
        name: '',
        licenseNumber: ''
    };

    accordionStates = {
        dentistDemographics: false,
        dentalCredentials: false,
        workHistory: false,
        attestations: false,
        signedDocuments: false,
        location: false
    };

    mockData = {
        demographics: {
            firstName: 'Nevin',
            lastName: 'Mathai',
            licenseNumber: '12345678',
            npi: '9876543210',
            specialty: 'General Dentistry'
        },
        credentials: {
            boardCertification: 'Yes',
            deaNumber: 'AB1234567',
            malpracticeInsurance: 'Insured'
        },
        workHistory: [
            { organization: 'Smile Clinic', startDate: '01/2020', endDate: 'Present' },
            { organization: 'Dental Care Plus', startDate: '06/2015', endDate: '12/2019' }
        ],
        attestations: {
            criminalHistory: 'No',
            malpracticeClaims: 'No',
            disciplinaryActions: 'No'
        },
        signedDocuments: [
            { name: 'Provider Agreement', date: '11/28/2025' },
            { name: 'W-9 Form', date: '11/28/2025' }
        ],
        location: {
            practiceName: 'Downtown Dental',
            address: '123 Main St, Cityville, ST 12345',
            phone: '(555) 123-4567'
        }
    };

    constructor(private router: Router) { }

    toggleAccordion(section: keyof typeof this.accordionStates) {
        this.accordionStates[section] = !this.accordionStates[section];
    }

    onSendAttestation() {
        console.log('Sending attestation...');
        // Handle send attestation logic
        alert('Attestation sent successfully!');
    }

    onPrevious() {
        this.router.navigate(['/wizard/step-6'], { skipLocationChange: true });
    }

    onFinish() {
        console.log('Finishing wizard...');
        this.router.navigate(['/']);
    }
}
