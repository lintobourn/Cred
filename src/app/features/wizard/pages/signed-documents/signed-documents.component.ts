import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { WizardNavigationComponent } from '../../../../shared/components/wizard-navigation/wizard-navigation.component';

interface Document {
    title: string;
    subtitle: string;
    isSigned?: boolean;
}

@Component({
    selector: 'app-signed-documents',
    standalone: true,
    imports: [CommonModule, WizardNavigationComponent],
    templateUrl: './signed-documents.component.html',
    styleUrl: './signed-documents.component.scss'
})
export class SignedDocumentsComponent implements OnInit {
    documents: Document[] = [
        {
            title: 'Uniform Requirements',
            subtitle: 'Required for onboarding'
        },
        {
            title: 'Participating Agreement',
            subtitle: 'Required for onboarding'
        },
        {
            title: 'Uniform Requirements',
            subtitle: 'Required for onboarding'
        }
    ];

    hasSignedDocument = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params['signed'] === 'true') {
                this.hasSignedDocument = true;
                // Mark the first document as signed for demo purposes
                // In a real app, we'd know which document was signed
                if (this.documents.length > 0) {
                    this.documents[0].isSigned = true;
                }
            }
        });
    }

    onReadAndSign(document: Document) {
        this.router.navigate(['/wizard/step-5/sign'], {
            queryParams: { title: document.title },
            skipLocationChange: true
        });
    }

    onView(document: Document) {
        console.log('View:', document.title);
    }

    onBack() {
        this.router.navigate(['/wizard/step-4'], { skipLocationChange: true });
    }

    onNext() {
        if (this.hasSignedDocument) {
            this.router.navigate(['/wizard/step-6'], { skipLocationChange: true });
        }
    }
}
