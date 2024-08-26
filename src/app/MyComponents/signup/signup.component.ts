import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../Services/alert/alert.service';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm = new FormGroup({
    name : new FormControl(''),
    email : new FormControl(''),
    password : new FormControl(''),
    cpassword : new FormControl(''),
  })

  constructor(private router: Router, private http: HttpClient, private alertService: AlertService) {}

  handleSubmit(event: Event) {
    event.preventDefault();
   if (this.signupForm.value.password !== this.signupForm.value.cpassword)
   {this.alertService.showAlert('password mismatched', 'Error');
  return; }
    this.http.post<any>(`${environment.host}/api/auth/createuser`, {name:this.signupForm.value.name,email:this.signupForm.value.email,password: this.signupForm.value.password })
      .subscribe(response => {
        if (response.success) {
          localStorage.setItem('token', response.authtoken);
          this.router.navigate(['/']);
          this.alertService.showAlert('Account Created Successfully', 'success');
        } else {
          this.alertService.showAlert('Invalid Details', 'Error');
        }
      });
  }

}
