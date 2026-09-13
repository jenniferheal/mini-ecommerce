import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../services/auth';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  private fb = new FormBuilder();
  private authService = inject(Auth);
  successMessage = signal('');
  errorMessage = signal('');

  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.successMessage.set('Account created! You can now log in.');
          this.errorMessage.set('');
          this.registerForm.reset();
        },
        error: () => {
          this.errorMessage.set('Registration failed. Email may already be in use.');
        },
      });
    }
  }
}
