import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-directory-info-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './directory-info-form.component.html',
    styleUrl: './directory-info-form.component.scss'
})
export class DirectoryInfoFormComponent {
    @Output() close = new EventEmitter<void>();
    @Output() submit = new EventEmitter<void>();

    formData = {
        weekendHours: null,
        weekendHoursDetails: '',
        morningHours: null,
        morningHoursDetails: '',
        eveningHours: null,
        eveningHoursDetails: '',
        emergencyPhone: null,
        emergencyPhoneDetails: '',
        publicTransit: null,
        publicTransitDetails: '',
        disabledAdults: null,
        disabledAdultsDetails: '',
        disabledChildren: null,
        disabledChildrenDetails: '',
        languages: '',
        website: ''
    };

    onCancel() {
        this.close.emit();
    }

    onSubmit() {
        // Validate if needed
        this.submit.emit();
    }
}
