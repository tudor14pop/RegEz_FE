import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from "@angular/router";
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import {ROUTES} from "./app.routes";
import {AppComponent} from './app.component';
// App views
import {DashboardsModule} from "./views/dashboards/dashboards.module";
import {AppviewsModule} from "./views/appviews/appviews.module";
// App modules/components
import {LayoutsModule} from "./components/common/layouts/layouts.module";
import {AuthenticationService} from "./services/auth/AuthenticationService";
import {HttpClientModule} from "@angular/common/http";
import {AuthGuardService} from "./services/auth/AuthGuardService";
import {UtilService} from "./services/UtilService";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        DashboardsModule,
        LayoutsModule,
        AppviewsModule,
        RouterModule.forRoot(ROUTES)
    ],
    providers: [
        AuthenticationService,
        AuthGuardService,
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        UtilService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
