import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WizardNavigationComponent } from '../../../../shared/components/wizard-navigation/wizard-navigation.component';
import { WorkHistoryService, WorkHistory } from '../../services/work-history.service';

@Component({
  selector: 'app-work-history',
  standalone: true,
  imports: [CommonModule, WizardNavigationComponent],
  templateUrl: './work-history.component.html',
  styleUrl: './work-history.component.scss'
})
export class WorkHistoryComponent implements OnInit {
  workHistories: WorkHistory[] = [];

  constructor(
    private router: Router,
    private workHistoryService: WorkHistoryService
  ) { }

  ngOnInit() {
    this.workHistoryService.workHistories$.subscribe(histories => {
      this.workHistories = histories;
    });
  }

  canAddMore(): boolean {
    return this.workHistoryService.canAddMore();
  }

  addMoreHistory() {
    if (this.canAddMore()) {
      this.router.navigate(['/wizard/step-3/add'], { skipLocationChange: true });
    }
  }

  editHistory(id: string) {
    this.router.navigate(['/wizard/step-3/edit', id], { skipLocationChange: true });
  }

  deleteHistory(id: string) {
    if (confirm('Are you sure you want to delete this work history?')) {
      this.workHistoryService.deleteWorkHistory(id);
    }
  }

  onBack() {
    this.router.navigate(['/wizard/step-2'], { skipLocationChange: true });
  }

  onNext() {
    // Navigate to next step
    this.router.navigate(['/wizard/step-4'], { skipLocationChange: true });
  }
}
