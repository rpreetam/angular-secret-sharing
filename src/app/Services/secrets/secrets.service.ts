import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SecretService {
  private host = environment.host;
  private secretsSubject = new BehaviorSubject<any[]>([]);
  public secrets$ = this.secretsSubject.asObservable();

  private authToken = localStorage.getItem('token');
  private gUser:any;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem("gUser");
    this.gUser = storedUser ? JSON.parse(storedUser) : null;
  }

  getSecrets(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': this.authToken ||''
    });
    const body = this.gUser ? { user: { id: this.gUser.sub } } : null;

    this.http.post<any[]>(`${this.host}/api/secrets/fetchallsecrets`, body, { headers })
      .subscribe(secrets => this.secretsSubject.next(secrets));
  }

  addSecret(description: string): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': this.authToken || ''
    });
    const body = { description, user: this.gUser ? { id: this.gUser.sub } : null };

    this.http.post<any>(`${this.host}/api/secrets/addsecret`, body, { headers })
      .subscribe(secret => {
        if (secret.error) {
          // Handle error (e.g., show alert)
        } else {
          const updatedSecrets = this.secretsSubject.value.concat(secret);
          this.secretsSubject.next(updatedSecrets);
          // Handle success (e.g., show alert)
        }
      });
  }
}
