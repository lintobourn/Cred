import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { WizardNavigationComponent } from '../../../../shared/components/wizard-navigation/wizard-navigation.component';
import { WorkHistoryService, WorkHistory } from '../../services/work-history.service';

@Component({
    selector: 'app-work-history-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, WizardNavigationComponent],
    templateUrl: './work-history-form.component.html',
    styleUrl: './work-history-form.component.scss'
})
export class WorkHistoryFormComponent implements OnInit {
    form: FormGroup;
    isEditMode = false;
    editId: string | null = null;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private workHistoryService: WorkHistoryService
    ) {
        this.form = this.fb.group({
            organization: [''],
            address: [''],
            city: [''],
            state: [''],
            zip: [''],
            phone: [''],
            startDate: [''],
            endDate: [''],
            hasGaps: [null],
            explanation: ['']
        });
    }

    ngOnInit() {
        // Check if we're in edit mode
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.isEditMode = true;
                this.editId = params['id'];
                this.loadWorkHistory(params['id']);
            }
        });
    }

    loadWorkHistory(id: string) {
        const histories = this.workHistoryService.getWorkHistories();
        const history = histories.find(h => h.id === id);
        if (history) {
            this.form.patchValue(history);
        }
    }

    onCancel() {
        this.router.navigate(['/wizard/step-3'], { skipLocationChange: true });
    }

    onSave() {
        if (this.form.valid) {
            const formData = this.form.value;

            if (this.isEditMode && this.editId) {
                // Update existing history
                const updatedHistory: WorkHistory = {
                    id: this.editId,
                    ...formData
                };
                this.workHistoryService.updateWorkHistory(this.editId, updatedHistory);
            } else {
                // Add new history
                const newHistory: WorkHistory = {
                    id: this.workHistoryService.generateId(),
                    ...formData
                };
                this.workHistoryService.addWorkHistory(newHistory);
            }

            // Navigate back to list
            this.router.navigate(['/wizard/step-3'], { skipLocationChange: true });
        } else {
            // Mark all fields as touched to show validation errors
            Object.keys(this.form.controls).forEach(key => {
                this.form.get(key)?.markAsTouched();
            });
        }
    }
}
