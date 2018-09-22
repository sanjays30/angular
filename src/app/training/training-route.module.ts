import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training.component';
import { AuthGaurd } from '../auth/auth.gaurd';
const routes: Routes = [
    { path: '', component: TrainingComponent, canActivate: [AuthGaurd] }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TrainingRouteModule { }
