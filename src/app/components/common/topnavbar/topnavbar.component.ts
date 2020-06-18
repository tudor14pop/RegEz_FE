import { Component } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import {AuthenticationService} from "../../../services/auth/AuthenticationService";
declare var jQuery:any;

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html'
})
export class TopNavbarComponent {
  
  constructor(
      public authenticationService: AuthenticationService
  ) {}

  toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }

}
