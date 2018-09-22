import { Component, OnInit, Input, ViewChild, Output, OnDestroy } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() sidenavClose = new EventEmitter<void>();
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
    this.sidenavClose.emit();
  }
  onLogout() {
    this.sidenavClose.emit();
    this.authService.logout();
  }
}
