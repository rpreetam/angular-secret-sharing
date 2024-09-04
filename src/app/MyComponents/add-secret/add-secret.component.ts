import { Component } from '@angular/core';
import { SecretService } from '../../Services/secrets/secrets.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-secret',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-secret.component.html',
  styleUrl: './add-secret.component.css'
})
export class AddSecretComponent {
  secret = '';
  constructor(private secretService: SecretService) { }

  handleClick() {
    if (this.secret.length >= 5) {
      this.secretService.addSecret(this.secret);
      this.secret = '';  // Reset the input field
    }
  }

}
