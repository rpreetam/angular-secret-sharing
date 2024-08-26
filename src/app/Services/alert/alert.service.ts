import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSource = new BehaviorSubject<{ msg: string; type: string } | undefined>(undefined);
  private errorSource = new BehaviorSubject<boolean>(false);

  alert$ = this.alertSource.asObservable();
  error$ = this.errorSource.asObservable();
  showAlert( msg: string, type: string){
    if (type === 'Error'){
      this.errorSource.next(true);
    }
    this.alertSource.next( {msg, type});
    setTimeout(() => {
      this.alertSource.next( undefined);
    }, 4000);

  }
}
