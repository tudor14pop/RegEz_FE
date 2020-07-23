import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { UsersComponent } from './components/administration/users/users.component';
import { InviteUserDialogComponent } from './components/administration/users/invite-user-dialog/invite-user-dialog.component';
import { ManageUserComponent } from './components/administration/users/manage-user/manage-user.component';
import { CompaniesComponent } from './components/administration/companies/companies.component';
import { ManageCompanyComponent } from './components/administration/companies/manage-company/manage-company.component';
import { CreateCompanyDialogComponent } from './components/administration/companies/create-company-dialog/create-company-dialog.component';
import { SiteFormComponent } from './components/administration/companies/manage-company/site-form/site-form.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {SuccessMessageComponent} from './services/http/success-message.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LabelService } from './services/label.service';
import { StudyAssignmentsComponent } from './components/administration/users/study-assignments/study-assignments.component';
import { TranslationsComponent } from './components/administration/translations/translations.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { CreateLabelComponent } from './components/administration/translations/create-label/create-label.component';
import { EditLabelComponent } from './components/administration/translations/edit-label/edit-label.component';
import { VersionsComponent } from './components/common/versions/versions.component';


@NgModule({
    declarations: [
        FooterComponent,
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
        SiteFormComponent,
        SuccessMessageComponent,
        StudyAssignmentsComponent,
        TranslationsComponent,
        NotFoundComponent,
        CreateLabelComponent,
        EditLabelComponent,
        VersionsComponent,
    ],
    imports: [
        BrowserModule,
        MatFormFieldModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatInputModule,
        MatDialogModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatSlideToggleModule,
    ],
    providers: [
        { provide: APP_INITIALIZER, multi: true, deps: [LabelService], useFactory: init},
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
    bootstrap: [AppComponent,  ],
    entryComponents: [NewStudyDialogComponent, ESignDialogComponent, InternalDialogComponent,
                      UploadFileDialogComponent, NewFolderDialogComponent, InviteUserDialogComponent,
                      CreateCompanyDialogComponent]
})
export class AppModule {
}

export function init_app(appLoadService: AppLoadService) {
    return () => appLoadService.initializeApp();
}

export function init(label: LabelService) {
    return () => label.load();
  }
