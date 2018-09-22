import { User } from './user.mode';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(private router: Router,
        private fauth: AngularFireAuth,
        private trnService: TrainingService,
        private uiService: UIService) { }
    // call this from Component
    initAuthListener() {
        this.fauth.authState.subscribe(
            user => {
                if (user) {
                    this.authChange.next(true);
                    this.router.navigate(['/training']);
                    this.isAuthenticated = true;
                } else {
                    this.trnService.cancelSubscriptions();
                    this.authChange.next(false);
                    this.router.navigate(['/login']);
                    this.isAuthenticated = false;
                }
            }
        );
    }
    registerUser(authData: AuthData) {
        this.uiService.loadingStatechanged.next(true);
        this.fauth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(
            result => {
                this.uiService.loadingStatechanged.next(false);
            }
        ).catch(error => {
            this.uiService.loadingStatechanged.next(false);
            this.uiService.showSnackbar(error.message, 3000, null);
        });
    }
    login(authData: AuthData) {
        this.uiService.loadingStatechanged.next(true);
        this.fauth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(
            result => {
                this.uiService.loadingStatechanged.next(false);
            }
        ).catch(error => {
            this.uiService.loadingStatechanged.next(false);
            this.uiService.showSnackbar(error.message, 3000, null);

        });

    }
    logout() {
        this.fauth.auth.signOut();
    }
    getUser() {
        // return { ...this.user };
    }
    isAuth() {
        return this.isAuthenticated;
    }
}
