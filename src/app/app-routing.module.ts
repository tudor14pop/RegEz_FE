import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/login.component';
import {AuthGuardService} from './services/auth/AuthGuardService';
import {TaskManagerComponent} from './components/task-manager/task-manager.component';
import { MasterFilesComponent } from './components/master-files/master-files.component';
import { StudyComponent } from './components/dashboard/study/study.component';
import { UsersComponent } from './components/administration/users/users.component';
import { ManageUserComponent } from './components/administration/users/manage-user/manage-user.component';
import { CompaniesComponent } from './components/administration/companies/companies.component';
import { ManageCompanyComponent } from './components/administration/companies/manage-company/manage-company.component';
import { StudyAssignmentsComponent } from './components/administration/users/study-assignments/study-assignments.component';
import { TranslationsComponent } from './components/administration/translations/translations.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { CreateLabelComponent } from './components/administration/translations/create-label/create-label.component';
import { EditLabelComponent } from './components/administration/translations/edit-label/edit-label.component';


const routes: Routes = [
    {path: '', component: LoginComponent },
    {path: 'login', component: LoginComponent },
    {path: 'dashboard', component: DashboardComponent},
    {path: 'task-manager', component: TaskManagerComponent},
    {path: 'master-files', component: MasterFilesComponent},
    {path: 'study/:id', component: StudyComponent},
    {path: 'administration/companies', component: CompaniesComponent},
    {path: 'administration/users', component: UsersComponent},
    {path: 'administration/translations', component: TranslationsComponent},
    {path: 'administration/translations/create', component: CreateLabelComponent},
    {path: 'administration/translations/edit/:id', component: EditLabelComponent},
    {path: 'administration/users/study-assignments', component: StudyAssignmentsComponent},
    {path: 'administration/users/:id', component: ManageUserComponent},
    {path: 'administration/companies/:id', component: ManageCompanyComponent},
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
