import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environments';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();
  private host = environment.host; // Replace with your environment variable

  constructor(private http: HttpClient) { }

  getUser(): void {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': token || ""
    });

    this.http.post<any>(`${this.host}/api/auth/getuser`, {}, { headers })
      .subscribe(user => {
        this.userSubject.next(user);
      });
  }

  getUserObservable(): Observable<any> {
    return this.userSubject.asObservable();
  }
}
