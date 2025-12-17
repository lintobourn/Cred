import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
    selector: 'app-pdf-signing',
    standalone: true,
    imports: [CommonModule, FormsModule, PdfViewerModule],
    templateUrl: './pdf-signing.component.html',
    styleUrl: './pdf-signing.component.scss'
})
export class PdfSigningComponent {
    @ViewChild('pdfContainer') pdfContainer!: ElementRef<HTMLDivElement>;

    documentTitle: string = '';
    pdfUrl: string = '/assets/pdf/fw9.pdf';

    // Signature states
    typedSignature = '';
    signatureScale: number = 1;

    // Placed signature
    placedSignature: {
        type: 'drawn' | 'typed' | 'uploaded';
        data: string;
        x: number;
        y: number;
        width: number;
        height: number;
        baseWidth: number;
        baseHeight: number;
        isDragging: boolean;
        isResizing: boolean;
        isFixed: boolean;
    } | null = null;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {
        // Get document title from route params
        this.route.queryParams.subscribe(params => {
            this.documentTitle = params['title'] || 'Document';
        });
    }

    // Typed signature methods
    useTypedSignature() {
        if (!this.typedSignature.trim()) {
            alert('Please type your signature first');
            return;
        }
        this.placeSignatureOnPdf('typed', this.typedSignature);
    }

    // Place signature on PDF
    placeSignatureOnPdf(type: 'drawn' | 'typed' | 'uploaded', data: string) {
        this.signatureScale = 1;
        const baseWidth = 200;
        const baseHeight = 60;

        this.placedSignature = {
            type,
            data,
            x: 100,
            y: 200,
            width: baseWidth,
            height: baseHeight,
            baseWidth: baseWidth,
            baseHeight: baseHeight,
            isDragging: false,
            isResizing: false,
            isFixed: false
        };
    }

    onScaleChange(event: Event) {
        const input = event.target as HTMLInputElement;
        this.signatureScale = parseFloat(input.value);
        if (this.placedSignature) {
            this.placedSignature.width = this.placedSignature.baseWidth * this.signatureScale;
            this.placedSignature.height = this.placedSignature.baseHeight * this.signatureScale;
        }
    }

    // Signature manipulation on PDF
    onSignatureMouseDown(event: MouseEvent) {
        if (!this.placedSignature || this.placedSignature.isFixed) return;

        this.placedSignature.isDragging = true;
        event.preventDefault();
    }

    onPdfMouseMove(event: MouseEvent) {
        if (!this.placedSignature || !this.placedSignature.isDragging) return;

        const rect = this.pdfContainer.nativeElement.getBoundingClientRect();
        this.placedSignature.x = event.clientX - rect.left - this.placedSignature.width / 2;
        this.placedSignature.y = event.clientY - rect.top - this.placedSignature.height / 2;
    }

    onPdfMouseUp() {
        if (this.placedSignature) {
            this.placedSignature.isDragging = false;
        }
    }

    fixSignature() {
        if (this.placedSignature) {
            this.placedSignature.isFixed = true;
            alert('Signature placed successfully!');
        }
    }

    cancelPlacement() {
        this.placedSignature = null;
    }

    // Upload final PDF
    uploadSignedPdf() {
        if (!this.placedSignature || !this.placedSignature.isFixed) {
            alert('Please place and fix the signature first');
            return;
        }

        // TODO: Implement actual PDF upload with signature
        console.log('Uploading signed PDF...');
        alert('PDF signed and uploaded successfully!');
        this.goBack(true);
    }

    goBack(signed: boolean = false) {
        this.router.navigate(['/wizard/step-5'], {
            queryParams: signed ? { signed: 'true' } : {},
            skipLocationChange: true
        });
    }
}
