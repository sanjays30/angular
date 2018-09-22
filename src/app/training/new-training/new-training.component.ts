import { Component, OnInit, EventEmitter, Output, Injectable, OnDestroy } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { TrainingService } from '../training.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { Exercise } from '../execise.model';
import { UIService } from '../../shared/ui.service';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
@Injectable()
export class NewTrainingComponent implements OnInit, OnDestroy {

  newTrainingForm: FormGroup;
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  loadingSubscription: Subscription;
  isLoading = false;
  constructor(private tservice: TrainingService, private uiService: UIService) { }

  ngOnInit() {
    this.exerciseSubscription = this.tservice.exercisesChanged.subscribe(
      ex => {
        this.exercises = ex;
      }
    );
    this.loadingSubscription = this.uiService.loadingStatechanged.subscribe(status => {
      this.isLoading = status;
    });
    this.tservice.fetchAvailableExecises();
  }
  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }


  }
  onstartTraining(form: NgForm) {
    this.tservice.startExercise(form.value.exercise);
  }
}
