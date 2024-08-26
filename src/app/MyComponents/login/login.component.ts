declare var google: any;
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AlertService } from '../../Services/alert/alert.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environments';
import { NgClass } from '@angular/common';
import { UserService } from '../../Services/user/user.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    google.accounts.id.initialize({
      client_id: environment.clientId,
      callback: (res: any) => {
        this.handleGoogleLogin(res);

      }
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 350
    })
  }

  private decodeToken(token: string) {
    return JSON.parse(window.atob(token.split('.')[1]));
  }

  handleGoogleLogin(response: any) {
    if (response) {

      // decode the token
      const payLoad = this.decodeToken(response.credential);
      //store in localstorage
      localStorage.setItem("gUser", JSON.stringify(payLoad));

      // set alert for success
      this.alertService.showAlert('Logged in Successfully', 'success');

      //nevigate to home
      this.router.navigate(['/']);
    }
  }


  async handleSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    try {
      const response = await fetch(`${environment.host}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();
      this.isLoading = false;

      if (json.success) {
        localStorage.setItem('token', json.authtoken);

        // Decode JWT if needed
        const decodedToken = jwtDecode(json.authtoken);
        this.alertService.showAlert('Logged in Successfully', 'success');
        this.router.navigate(['/']);
        this.userService.getUser();
      }  else {
        this.alertService.showAlert(json.message || 'Invalid credentials', 'Error');
      }
    } catch (error) {
      console.error('Login failed', error);
      this.isLoading = false;
      this.alertService.showAlert('Login failed. Please try again later.', 'Error');
    }
  }



  // Helper methods to access form controls
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
