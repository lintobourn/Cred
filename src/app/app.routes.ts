import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing/pages/landing-page/landing-page.component';
import { WizardLayoutComponent } from './features/wizard/layout/wizard-layout/wizard-layout.component';
import { DentistDemographicsComponent } from './features/wizard/pages/dentist-demographics/dentist-demographics.component';
import { DentalCredentialsComponent } from './features/wizard/pages/dental-credentials/dental-credentials.component';
import { WorkHistoryComponent } from './features/wizard/pages/work-history/work-history.component';
import { WorkHistoryFormComponent } from './features/wizard/pages/work-history-form/work-history-form.component';
import { AttestationsComponent } from './features/wizard/pages/attestations/attestations.component';
import { SignedDocumentsComponent } from './features/wizard/pages/signed-documents/signed-documents.component';
import { PdfSigningComponent } from './features/wizard/pages/pdf-signing/pdf-signing.component';
import { LocationComponent } from './features/wizard/pages/location/location.component';
import { AddLocationComponent } from './features/wizard/pages/add-location/add-location.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { ConfirmationComponent } from './features/wizard/pages/confirmation/confirmation.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'wizard',
    component: WizardLayoutComponent,
    children: [
      { path: '', component: DentistDemographicsComponent },
      { path: 'step-1', component: DentistDemographicsComponent },
      { path: 'step-2', component: DentalCredentialsComponent },
      { path: 'step-3', component: WorkHistoryComponent },
      { path: 'step-3/add', component: WorkHistoryFormComponent },
      { path: 'step-3/edit/:id', component: WorkHistoryFormComponent },
      { path: 'step-4', component: AttestationsComponent },
      { path: 'step-5', component: SignedDocumentsComponent },
      { path: 'step-5/sign', component: PdfSigningComponent },
      { path: 'step-6', component: LocationComponent },
      { path: 'step-6/add', component: AddLocationComponent },
      { path: 'step-7', component: ConfirmationComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
