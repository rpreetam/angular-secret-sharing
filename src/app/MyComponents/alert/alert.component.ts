import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { AlertService } from '../../Services/alert/alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit {
  alert: {msg:string; type:string} | undefined ;  // Define the type of alert
  error: boolean = false;  // Define the type of erro

  constructor(private alertService: AlertService){

  }
  ngOnInit(): void {  
         // Subscribe to alert and error observables
        this.alertService.alert$.subscribe(alert => {
          this.alert = alert;
        });

        this.alertService.error$.subscribe(error => {
          this.error = error;
        });
}
    
  
    
  
  


  

}
