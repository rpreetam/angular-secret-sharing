declare var google: any;
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from '../../Services/user/user.service';
import { gUserService } from '../../Services/gUser/g-user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoginRoute: boolean = false;
  isSignupRoute: boolean = false;
  user: any;
  gUser: any;



  constructor(private router: Router, private userService: UserService, private cdr: ChangeDetectorRef, private gUserService: gUserService,) {


  }

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.user = user;

    });

    this.gUserService.getGUser().subscribe(gUser => {
      this.gUser = gUser;
      // Mark for check if using OnPush change detection
      this.cdr.markForCheck();
    });
    this.router.events.subscribe(() => {
      this.isLoginRoute = this.router.url === '/login';
      this.isSignupRoute = this.router.url === '/signup';
    });

  }

  onLogoutClick() {
    google.accounts.id.disableAutoSelect();
    localStorage.removeItem("token");
    localStorage.removeItem("gUser");
    this.user = null;
    this.gUser = null;
    this.gUserService.setGUser(null);
    this.cdr.detectChanges();
    this.router.navigate(['/login']);
  }





}
