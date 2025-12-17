import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wizard-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wizard-navigation.component.html',
  styleUrl: './wizard-navigation.component.scss'
})
export class WizardNavigationComponent {
  @Input() showBack = true;
  @Input() showNext = true;
  @Input() showFinish = false;
  @Input() disableNext = false;
  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() finish = new EventEmitter<void>();

  onBack() {
    this.back.emit();
  }

  onNext() {
    this.next.emit();
  }

  onFinish() {
    this.finish.emit();
  }
}
