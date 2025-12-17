import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface WizardStep {
  title: string;
  description: string;
  route: string;
  stepNumber: number;
}

@Component({
  selector: 'app-wizard-accordion',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './wizard-accordion.component.html',
  styleUrl: './wizard-accordion.component.scss',
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ height: '0', opacity: 0 }))
      ])
    ])
  ]
})
export class WizardAccordionComponent implements OnInit {
  activeStep: number = 0; // 0-indexed for array access

  steps: WizardStep[] = [
    {
      title: 'Dentist Demographics',
      description: 'Essential provider information for identification',
      route: '/wizard/step-1',
      stepNumber: 1
    },
    {
      title: 'Dental Credentials',
      description: 'Licenses, certifications, and qualifications of provider',
      route: '/wizard/step-2',
      stepNumber: 2
    },
    {
      title: 'Work History /School Dates',
      description: 'Fill in your personal details',
      route: '/wizard/step-3',
      stepNumber: 3
    },
    {
      title: 'Attestation',
      description: 'Fill in your personal details',
      route: '/wizard/step-4',
      stepNumber: 4
    },
    {
      title: 'Signed Document',
      description: 'Fill in your personal details',
      route: '/wizard/step-5',
      stepNumber: 5
    },
    {
      title: 'Location',
      description: 'Fill in your personal details',
      route: '/wizard/step-6',
      stepNumber: 6
    },
    {
      title: 'Confirmation',
      description: 'Fill in your personal details',
      route: '/wizard/step-7',
      stepNumber: 7
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    this.updateActiveStep(this.router.url);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateActiveStep(event.url);
    });
  }

  private updateActiveStep(url: string) {
    if (url.includes('step-1')) this.activeStep = 0;
    else if (url.includes('step-2')) this.activeStep = 1;
    else if (url.includes('step-3')) this.activeStep = 2;
    else if (url.includes('step-4')) this.activeStep = 3;
    else if (url.includes('step-5')) this.activeStep = 4;
    else if (url.includes('step-6')) this.activeStep = 5;
    else if (url.includes('step-7')) this.activeStep = 6;
  }

  toggleStep(index: number) {
    // Navigate to the step's route. The router event will update activeStep.
    const step = this.steps[index];
    if (step) {
      this.router.navigate([step.route]);
    }
  }

  isStepCompleted(index: number): boolean {
    return this.activeStep > index;
  }
}
