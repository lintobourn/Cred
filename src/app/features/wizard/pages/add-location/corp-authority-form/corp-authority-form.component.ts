import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-corp-authority-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './corp-authority-form.component.html',
    styleUrl: './corp-authority-form.component.scss'
})
export class CorpAuthorityFormComponent {
    @Output() close = new EventEmitter<void>();
    @Output() done = new EventEmitter<void>();

    formData = {
        existingLocation: '',
        additionalLocationName: '',
        city: '',
        state: '',
        contact: '',
        primaryLocation: '',
        address: '',
        tin: '',
        certified: false,
        fullName: ''
    };

    onCancel() {
        this.close.emit();
    }

    onDone() {
        // Validate if needed
        this.done.emit();
    }
}
