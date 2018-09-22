import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class UIService {
    constructor(private snackbar: MatSnackBar) { }
    loadingStatechanged = new Subject<boolean>();
    showSnackbar(message: string, duration: number, action: string) {
        this.snackbar.open(message, action, {
            duration: duration
        });
    }
}
