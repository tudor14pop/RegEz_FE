import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BasicLayoutComponent} from './components/common/layout/basicLayout.component';
import {FooterComponent} from './components/common/footer/footer.component';
import {NavigationComponent} from './components/common/navigation/navigation.component';
import {TopNavbarComponent} from './components/common/topnavbar/topnavbar.component';
import { TaskManagerComponent } from './components/task-manager/task-manager.component';
import { NewStudyDialogComponent } from './components/dashboard/new-study-dialog/new-study-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ESignDialogComponent } from './components/task-manager/e-sign-dialog/e-sign-dialog.component';
import { InternalDialogComponent } from './components/task-manager/internal-dialog/internal-dialog.component';
import { ExternalDialogComponent } from './components/task-manager/external-dialog/external-dialog.component';
import { MasterFilesComponent } from './components/master-files/master-files.component';

@NgModule({
    declarations: [
        FooterComponent,
        BasicLayoutComponent,
        AppComponent,
        LoginComponent,
        DashboardComponent,
        NavigationComponent,
        TopNavbarComponent,
        TaskManagerComponent,
        NewStudyDialogComponent,
        ESignDialogComponent,
        InternalDialogComponent,
        ExternalDialogComponent,
        MasterFilesComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatDialogModule,
        BrowserAnimationsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [NewStudyDialogComponent, ESignDialogComponent, InternalDialogComponent]
})
export class AppModule {
}
