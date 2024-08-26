import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class gUserService {
  private gUserSource =  new BehaviorSubject<any>(null);

  gUser$ = this.gUserSource.asObservable();


  constructor() {
    // Get the user from localStorage when the service is initialized
    
    this.initializeUser();
  }

  // Observable to get the current user
  private initializeUser(): void {
  
    const storedData = localStorage.getItem('gUser');
    const userData = storedData ? JSON.parse(storedData) : null;
     this.gUserSource.next(userData);
  }

  getGUser(): Observable<any> {
    return this.gUser$;
  }
setGUser (user:any){
this.gUserSource.next(user);
}



}
