import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";

import {StarterViewComponent} from "./starterview.component";
import {LoginComponent} from "./login.component";

import {PeityModule } from '../../components/charts/peity';
import {SparklineModule } from '../../components/charts/sparkline';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    StarterViewComponent,
    LoginComponent
  ],
    imports: [
        BrowserModule,
        RouterModule,
        PeityModule,
        SparklineModule,
        ReactiveFormsModule
    ],
  exports: [
    StarterViewComponent,
    LoginComponent
  ],
})

export class AppviewsModule {
}
