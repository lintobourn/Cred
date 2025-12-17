import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WizardNavigationComponent } from '../../../../shared/components/wizard-navigation/wizard-navigation.component';
import { CorpAuthorityFormComponent } from './corp-authority-form/corp-authority-form.component';
import { DirectoryInfoFormComponent } from './directory-info-form/directory-info-form.component';

@Component({
    selector: 'app-add-location',
    standalone: true,
    imports: [CommonModule, FormsModule, WizardNavigationComponent, CorpAuthorityFormComponent, DirectoryInfoFormComponent],
    templateUrl: './add-location.component.html',
    styleUrl: './add-location.component.scss'
})
export class AddLocationComponent {
    formData = {
        tin: '',
        locationName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        primaryLocation: null,
        stillPractice: null,
        dateEnded: '',
        participating: null
    };

    directoryInfoSigned = false;
    corporateAuthSigned = false;
    showCorpAuthPopup = false;
    showDirectoryInfoPopup = false;

    constructor(private router: Router) { }

    onReadAndSign(type: 'directory' | 'corporate') {
        if (type === 'directory') {
            // Show popup for directory information
            this.showDirectoryInfoPopup = true;
        } else {
            // Show popup for corporate authority form
            this.showCorpAuthPopup = true;
        }
    }

    onCorpAuthDone() {
        this.corporateAuthSigned = true;
        this.showCorpAuthPopup = false;
    }

    onCorpAuthClose() {
        this.showCorpAuthPopup = false;
    }

    onDirectoryInfoSubmit() {
        this.directoryInfoSigned = true;
        this.showDirectoryInfoPopup = false;
    }

    onDirectoryInfoClose() {
        this.showDirectoryInfoPopup = false;
    }

    onAddLocation() {
        // Validate and save
        console.log('Adding location', this.formData);
        this.router.navigate(['/wizard/step-6'], { skipLocationChange: true });
    }

    onBack() {
        this.router.navigate(['/wizard/step-6'], { skipLocationChange: true });
    }
}
