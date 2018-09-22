import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  constructor(private authService: AuthService) { }
  authSubscription: Subscription;
  ngOnInit() {
    this.authService.authChange.subscribe((authStatus: boolean) => {
      this.isAuth = authStatus;
    });
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
  onClose() {
    this.sidenavToggle.emit();
  }
  logoutNow() {
    this.authService.logout();
  }
}
