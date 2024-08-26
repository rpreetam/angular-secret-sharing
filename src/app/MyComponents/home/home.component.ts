import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SecretsComponent } from '../secrets/secrets.component';
import { gUserService } from '../../Services/gUser/g-user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SecretsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  authtoken: string | null;
  gUser: any;


  constructor(private router: Router,private gUserService: gUserService ) {
    this.authtoken = localStorage.getItem('token');
  }

  ngOnInit(): void {
    const storedData = localStorage.getItem('gUser');
    if (storedData){
      this.gUser = JSON.parse(storedData);
    }
    this.gUserService.setGUser(this.gUser)
      if (!this.authtoken && !this.gUser) {
        this.router.navigate(['/login']);
      }
    
      
    
    
  }

}
