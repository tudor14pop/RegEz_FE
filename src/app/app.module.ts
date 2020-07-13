import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BasicLayoutComponent} from './components/common/layout/basicLayout.component';
import {FooterComponent} from './components/common/footer/footer.component';
import {NavigationComponent} from './components/common/navigation/navigation.component';
import {TopNavbarComponent} from './components/common/topnavbar/topnavbar.component';
import {TaskManagerComponent} from './components/task-manager/task-manager.component';
import {NewStudyDialogComponent} from './components/dashboard/new-study-dialog/new-study-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ESignDialogComponent } from './components/task-manager/e-sign-dialog/e-sign-dialog.component';
import { InternalDialogComponent } from './components/task-manager/internal-dialog/internal-dialog.component';
import { ExternalDialogComponent } from './components/task-manager/external-dialog/external-dialog.component';
import { MasterFilesComponent } from './components/master-files/master-files.component';
import {HttpRequestInterceptor} from './services/http-request.interceptor';
import {AppLoadService} from './services/AppLoadService';
import {InfoPopupComponent} from './components/common/info-popup.component';
import { StudyComponent } from './components/dashboard/study/study.component';
import { UploadFileDialogComponent } from '../app/components/common/upload-file-dialog/upload-file-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NewFolderDialogComponent } from './components/common/new-folder-dialog/new-folder-dialog.component';
import { UsersComponent } from './components/administration/users/users.component';
import { InviteUserDialogComponent } from './components/administration/users/invite-user-dialog/invite-user-dialog.component';
import { ManageUserComponent } from './components/administration/users/manage-user/manage-user.component';
import { CompaniesComponent } from './components/administration/companies/companies.component';
import { ManageCompanyComponent } from './components/administration/companies/manage-company/manage-company.component';
import { CreateCompanyDialogComponent } from './components/administration/companies/create-company-dialog/create-company-dialog.component';


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
        InfoPopupComponent,
        StudyComponent,
        UploadFileDialogComponent,
        NewFolderDialogComponent,
        UsersComponent,
        InviteUserDialogComponent,
        ManageUserComponent,
        CompaniesComponent,
        ManageCompanyComponent,
        CreateCompanyDialogComponent,

    ],
    imports: [
        BrowserModule,
        MatFormFieldModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptor,
            multi: true
        },
        {
            provide: APP_INITIALIZER,
            useFactory: init_app,
            deps: [AppLoadService],
            multi: true
        },
    ],
    bootstrap: [AppComponent],
    entryComponents: [NewStudyDialogComponent, ESignDialogComponent, InternalDialogComponent,
                      UploadFileDialogComponent, NewFolderDialogComponent, InviteUserDialogComponent,
                      CreateCompanyDialogComponent]
})
export class AppModule {
}

export function init_app(appLoadService: AppLoadService) {
    return () => appLoadService.initializeApp();
}

