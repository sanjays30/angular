import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxdate: Date;
  isLoading = false;
  loadingSubscription: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStatechanged.subscribe(status => {
      this.isLoading = status;
    });
    this.maxdate = new Date();
    this.maxdate.setFullYear(this.maxdate.getFullYear() - 18);
  }
  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
  onSubmit(form: NgForm) {
    // console.log(form);
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
}
