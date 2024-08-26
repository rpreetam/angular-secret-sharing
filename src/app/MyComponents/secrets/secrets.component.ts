import { Component, OnInit } from '@angular/core';
import { AddSecretComponent } from '../add-secret/add-secret.component';
import { SecretItemComponent } from '../secret-item/secret-item.component';
import { SecretService } from '../../Services/secrets/secrets.service';

@Component({
  selector: 'app-secrets',
  standalone: true,
  imports: [AddSecretComponent,SecretItemComponent],
  templateUrl: './secrets.component.html',
  styleUrl: './secrets.component.css'
})
export class SecretsComponent implements OnInit {
  secrets: any ;

  constructor(private secretService: SecretService){

  }

  ngOnInit(): void {
    this.secretService.secrets$.subscribe(secrets =>{
      this.secrets = secrets;
    });
    this.secretService.getSecrets();
  }

}
