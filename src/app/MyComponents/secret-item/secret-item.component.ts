import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-secret-item',
  standalone: true,
  imports: [],
  templateUrl: './secret-item.component.html',
  styleUrl: './secret-item.component.css'
})
export class SecretItemComponent {
  @Input () index = 0;
  @Input () secret = {description:''};

}
