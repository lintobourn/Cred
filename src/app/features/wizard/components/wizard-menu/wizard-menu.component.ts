import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-wizard-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wizard-menu.component.html',
  styleUrl: './wizard-menu.component.scss'
})
export class WizardMenuComponent implements OnInit {
  currentStep = 1;
  steps = [
    { title: 'Dentist Demographics', description: 'Essential provider information for identification' },
    { title: 'Dental Credentials', description: 'Licenses, certifications, and qualifications of provider' },
    { title: 'Work History or School Dates', description: 'Fill in your personal details' },
    { title: 'Attestations', description: 'Fill in your personal details' },
    { title: 'Signed Documents', description: 'Fill in your personal details' },
    { title: 'Location', description: 'Fill in your personal details' },
    { title: 'Confirmation', description: 'Fill in your personal details' }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    this.updateCurrentStep(this.router.url);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateCurrentStep(event.url);
    });
  }

  private updateCurrentStep(url: string) {
    if (url.endsWith('/wizard') || url.includes('step-1')) this.currentStep = 1;
    else if (url.includes('step-2')) this.currentStep = 2;
    else if (url.includes('step-3')) this.currentStep = 3;
    else if (url.includes('step-4')) this.currentStep = 4;
    else if (url.includes('step-5')) this.currentStep = 5;
    else if (url.includes('step-6')) this.currentStep = 6;
    else if (url.includes('step-7')) this.currentStep = 7;
  }
}
