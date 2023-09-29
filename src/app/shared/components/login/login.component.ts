import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthRequest } from '../../models/auth-request.model';
import { MessageService } from 'primeng/api';
import { ErrorResponse } from '../../models/error-response.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  login$!: Subscription;

  constructor(private fb: FormBuilder, private authService: AuthService, 
    private messageService: MessageService, private route: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        username: ['', { validators: [Validators.required], updateOn: 'blur' }],
        password: ['', { validators: [Validators.required] }],
      }
    )
  }

  login(): void {
    this.login$ = this.authService.login(this.loginForm.value as AuthRequest).subscribe({
      next: (response) => {
        localStorage.setItem("auth", JSON.stringify(response));
        this.route.navigate(["/admin/user"]);
      },
      error: (error: ErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: error.description, detail: error.message })
      }
    });
  }

  isFormInvalid(formControlName: string) {
    return this.f[formControlName].invalid && (this.f[formControlName].dirty || this.f[formControlName].touched);
  }

  hasError(formControlName: string, errorName: string) {
    return this.f[formControlName].hasError(errorName);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  ngOnDestroy(): void {
    this.login$?.unsubscribe();
  }

}
