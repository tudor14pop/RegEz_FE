import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/login.component';
import {AuthGuardService} from './services/auth/AuthGuardService';
import {BasicLayoutComponent} from './components/common/layout/basicLayout.component';
import {TaskManagerComponent} from './components/task-manager/task-manager.component';
import { MasterFilesComponent } from './components/master-files/master-files.component';
import { StudyComponent } from './components/dashboard/study/study.component';
import { UsersComponent } from './components/administration/users/users.component';
import { ManageUserComponent } from './components/administration/users/manage-user/manage-user.component';
import { CompaniesComponent } from './components/administration/companies/companies.component';
import { ManageCompanyComponent } from './components/administration/companies/manage-company/manage-company.component';


const routes: Routes = [
    {
        path: '', 
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '', component: BasicLayoutComponent,
        children: [
            {path: 'dashboard', component: DashboardComponent},
            {path: 'task-manager', component: TaskManagerComponent},
            {path: 'master-files', component: MasterFilesComponent},
            {path: 'study/:id', component: StudyComponent},
            {path: 'administration/companies', component: CompaniesComponent},
            {path: 'administration/users', component: UsersComponent},
            {path: 'administration/users/:id', component: ManageUserComponent},
            {path: 'administration/companies/:id', component: ManageCompanyComponent}

        ]
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
