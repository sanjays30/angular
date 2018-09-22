import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    loginGroup: FormGroup = new FormGroup({
        email: new FormControl('', { validators: [Validators.required, Validators.email] }),
        password: new FormControl('', { validators: [Validators.required] })
    }
    );
    isLoading = false;
    loadingSubscription: Subscription;
    constructor(private authService: AuthService, private uiService: UIService) { }

    ngOnInit() {
        this.loadingSubscription = this.uiService.loadingStatechanged.subscribe(status => {
            this.isLoading = status;
        });

    }
    ngOnDestroy(): void {
        if (this.loadingSubscription) {
            this.loadingSubscription.unsubscribe();
        }
    }
    submitForm() {
        // console.log(this.loginGroup);
        this.authService.login({
            email: this.loginGroup.value.email,
            password: this.loginGroup.value.password
        });
    }
}
