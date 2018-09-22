import { Exercise } from './execise.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../shared/ui.service';
@Injectable()
export class TrainingService {
    private _availableExecises: Exercise[] = [];
    constructor(private db: AngularFirestore, private uiService: UIService) {
    }
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();

    private fbSubs: Subscription[] = [];
    private _runningExercise: Exercise;

    fetchAvailableExecises() {
        this.uiService.loadingStatechanged.next(true);
        this.fbSubs.push(
            this.db.collection('availableExercises').snapshotChanges().pipe(
                map(docArray => docArray.map(doc => {
                    const data = doc.payload.doc.data();
                    const id = doc.payload.doc.id;
                    return { id, ...data };
                }))
            ).subscribe((exercisesIn: Exercise[]) => {
                this.uiService.loadingStatechanged.next(false);
                console.log(exercisesIn);
                this._availableExecises = exercisesIn;
                this.exercisesChanged.next(exercisesIn);
            }, error => {
                this.uiService.loadingStatechanged.next(false);
                this.uiService.showSnackbar(error.message, 3000, null);
            }
            )
        );

    }
    get runningExercise() {
        return { ...this._runningExercise };
    }
    startExercise(selectedId: string) {
        // this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});

        this._runningExercise = this._availableExecises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({ ...this._runningExercise });
    }
    completeExercise() {
        this.addDataToDatabase({ ...this._runningExercise, date: new Date(), state: 'completed' });
        this._runningExercise = null;
        this.exerciseChanged.next(null);
    }
    cancelExercise(progress: number) {
        this.addDataToDatabase({
            ...this._runningExercise, date: new Date(),
            state: 'cancelled',
            duration: this._runningExercise.duration * (progress / 100),
            calories: this._runningExercise.calories * (progress / 100)
        });
        this._runningExercise = null;
        this.exerciseChanged.next(null);
    }
    fetchCompletedCancelledExercises() {
        this.uiService.loadingStatechanged.next(true);

        this.fbSubs.push(
            this.db
                .collection('finishedExercises').valueChanges()
                .subscribe((exercises: Exercise[]) => {
                    this.uiService.loadingStatechanged.next(false);

                    this.finishedExercisesChanged.next(exercises);
                }, error => {
                    this.uiService.loadingStatechanged.next(false);
                    this.uiService.showSnackbar(error.message, 3000, null);
                })
        );
    }
    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }
    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }
}
