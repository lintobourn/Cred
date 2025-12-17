import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WizardNavigationComponent } from '../../../../shared/components/wizard-navigation/wizard-navigation.component';

interface Location {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    participating: boolean;
}

@Component({
    selector: 'app-location',
    standalone: true,
    imports: [CommonModule, FormsModule, WizardNavigationComponent],
    templateUrl: './location.component.html',
    styleUrl: './location.component.scss'
})
export class LocationComponent {
    searchTerm: string = '';
    locations: Location[] = [
        {
            id: 1,
            name: 'Lorem Ipsum',
            address: 'Lorem Ipsum',
            city: 'Lorem Ipsum',
            state: 'Lorem Ipsum',
            participating: true
        },
        {
            id: 2,
            name: 'Lorem Ipsum',
            address: 'Lorem Ipsum',
            city: 'Lorem Ipsum',
            state: 'Lorem Ipsum',
            participating: false
        }
    ];

    constructor(private router: Router) { }

    get filteredLocations() {
        return this.locations.filter(location =>
            location.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            location.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            location.city.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    onAddLocation() {
        this.router.navigate(['/wizard/step-6/add'], { skipLocationChange: true });
    }

    onEdit(id: number) {
        console.log('Edit location', id);
    }

    onBack() {
        this.router.navigate(['/wizard/step-5'], { skipLocationChange: true });
    }

    onNext() {
        this.router.navigate(['/wizard/step-7'], { skipLocationChange: true });
    }
}
