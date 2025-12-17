import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit, OnDestroy {
    currentSlide = 0;
    slideInterval: any;

    formData = {
        username: '',
        password: '',
        confirmPassword: '',
        dentistFirstName: '',
        dentistLastName: '',
        licenseNumber: '',
        licenseState: '',
        npiNumber: '',
        emailAddress: '',
        challengeQuestion: '',
        challengeAnswer: ''
    };

    challengeQuestions = [
        'What was the name of your first pet?',
        'What is your mother\'s maiden name?',
        'What city were you born in?',
        'What is your favorite color?',
        'What was the make of your first car?'
    ];

    constructor(private router: Router) { }

    ngOnInit() {
        // Start slideshow
        this.slideInterval = setInterval(() => {
            this.currentSlide = (this.currentSlide + 1) % 2;
        }, 5000);
    }

    ngOnDestroy() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }
    }

    onCreateAccount() {
        // Validate form
        if (this.formData.password !== this.formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Handle account creation
        console.log('Creating account', this.formData);
        // Navigate to login or dashboard
    }

    onSignIn() {
        this.router.navigate(['/login']);
    }
}
