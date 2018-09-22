import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import { Exercise } from '../execise.model';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer;
  runningExercise: Exercise;


  constructor(private dialog: MatDialog, private tservice: TrainingService) { }

  startorResumeTimer() {
    const step = this.runningExercise.duration * 1000.0 / 100;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.tservice.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }
  ngOnInit() {
    this.runningExercise = this.tservice.runningExercise;
    this.tservice.exerciseChanged.subscribe((exr: Exercise) => {
      this.runningExercise = exr;
    });
    this.startorResumeTimer();
  }
  stopTimer() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, { data: { progress: this.progress } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
         this.tservice.cancelExercise(this.progress);
      } else {
        this.startorResumeTimer();
      }
    });

  }

}
