import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../execise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['date', 'name', 'duration', 'calories', 'state'];
  datasource = new MatTableDataSource<Exercise>();
  isLoading = false;
  private exchangedsubscruption: Subscription;
  private loadingSubscription: Subscription;


  constructor(private trservice: TrainingService, private uiService: UIService) { }

  ngAfterViewInit(): void {
    this.datasource.paginator = this.paginator;
  }
  ngOnInit() {
    this.exchangedsubscruption = this.trservice.finishedExercisesChanged.subscribe((exercises: Exercise[]) => {
      this.datasource.data = exercises;
      this.datasource.sort = this.sort;
    });
    this.loadingSubscription = this.uiService.loadingStatechanged.subscribe(status => {
      this.isLoading = status;
    });
    this.trservice.fetchCompletedCancelledExercises();

  }
  ngOnDestroy(): void {
    this.exchangedsubscruption.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }
  doFilter(data: string) {
    this.datasource.filter = data.trim().toLowerCase();
  }
}
