import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BasicLayoutComponent} from "./components/common/layout/basicLayout.component";
import {FooterComponent} from "./components/common/footer/footer.component";
import {NavigationComponent} from "./components/common/navigation/navigation.component";
import {TopNavbarComponent} from "./components/common/topnavbar/topnavbar.component";
import { TaskManagerComponent } from './components/task-manager/task-manager.component';

@NgModule({
    declarations: [
        FooterComponent,
        BasicLayoutComponent,
        AppComponent,
        LoginComponent,
        DashboardComponent,
        NavigationComponent,
        TopNavbarComponent,
        TaskManagerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
