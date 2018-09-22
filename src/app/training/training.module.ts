import { NgModule } from '@angular/core';
import { PastTrainingComponent } from './past-training/past-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { TrainingComponent } from './training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { SharedModule } from '../shared/shared.module';
import { TrainingRouteModule } from './training-route.module';
@NgModule({
    declarations: [TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        StopTrainingComponent],
    imports: [SharedModule,
        ReactiveFormsModule, TrainingRouteModule],
    exports: [],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule { }
