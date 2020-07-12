import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/login.component';
import {AuthGuardService} from './services/auth/AuthGuardService';
import {BasicLayoutComponent} from './components/common/layout/basicLayout.component';
import {TaskManagerComponent} from './components/task-manager/task-manager.component';
import { MasterFilesComponent } from './components/master-files/master-files.component';
import { StudyComponent } from './components/dashboard/study/study.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { UsersComponent } from './components/administration/users/users.component';
import { ManageUserComponent } from './components/administration/users/manage-user/manage-user.component';


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
            {path: 'administration/company', component: AdministrationComponent},
            {path: 'administration/users', component: UsersComponent},
            {path: 'administration/users/:id', component: ManageUserComponent}


        ]
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
