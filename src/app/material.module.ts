import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule } from '@angular/material';
import { MatNativeDateModule, MatSidenavModule, MatToolbarModule, MatListModule, MatTabsModule, MatCardModule } from '@angular/material';
import { MatCheckboxModule, MatSelectModule, MatMenuModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';
import { MatTableModule, MatSortModule, MatPaginatorModule, MatSnackBarModule } from '@angular/material';
@NgModule(
    {
        imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,
            MatDatepickerModule, MatNativeDateModule, MatCheckboxModule,
            MatSidenavModule, MatToolbarModule, MatListModule, MatTabsModule,
            MatCardModule, MatSelectModule, MatMenuModule, MatProgressSpinnerModule,
            MatDialogModule, MatTableModule, MatSortModule,
            MatPaginatorModule, MatSnackBarModule],
        exports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,
            MatDatepickerModule, MatNativeDateModule, MatCheckboxModule,
            MatSidenavModule, MatToolbarModule, MatListModule, MatTabsModule,
            MatCardModule, MatSelectModule, MatMenuModule, MatProgressSpinnerModule,
            MatDialogModule, MatTableModule, MatSortModule,
            MatPaginatorModule, MatSnackBarModule]
    }
)
export class MaterialModule { }
