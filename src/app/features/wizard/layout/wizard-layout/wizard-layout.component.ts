import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { WizardMenuComponent } from '../../components/wizard-menu/wizard-menu.component';
import { WizardAccordionComponent } from '../../components/wizard-accordion/wizard-accordion.component';

@Component({
  selector: 'app-wizard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HeaderComponent, FooterComponent, WizardMenuComponent, WizardAccordionComponent],
  templateUrl: './wizard-layout.component.html',
  styleUrl: './wizard-layout.component.scss'
})
export class WizardLayoutComponent implements OnInit {
  isMobile = false;

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 1024;
  }
}
