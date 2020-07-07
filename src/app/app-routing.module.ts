import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/login.component';
import {AuthGuardService} from './services/auth/AuthGuardService';
import {BasicLayoutComponent} from './components/common/layout/basicLayout.component';
import {TaskManagerComponent} from './components/task-manager/task-manager.component';
<<<<<<< Updated upstream
import { MasterFilesComponent } from './components/master-files/master-files.component';
=======
import { StudyComponent } from './components/dashboard/study/study.component';
>>>>>>> Stashed changes


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
<<<<<<< Updated upstream
            {path: 'master-files', component: MasterFilesComponent},
=======
            {path: 'study', component: StudyComponent},
>>>>>>> Stashed changes
        ]
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
