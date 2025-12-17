import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  networkParticipations = [
    {
      name: 'Nevin Mathai, DMD',
      credentialingDates: '07/17/2023-07/30/2026',
      recred: '30-07-2026',
      status: 'Recredential Due',
      action: 'Recred'
    }
  ];

  constructor(private router: Router) { }

  onStart() {
    this.router.navigate(['/wizard']);
  }

  onRecred(item: any) {
    console.log('Recred clicked for:', item);
    // Handle recredential action
  }
}
