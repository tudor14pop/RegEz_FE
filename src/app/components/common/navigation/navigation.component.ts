import {Component} from '@angular/core';
import {AuthenticationService} from "../../../services/auth/AuthenticationService";

@Component({
    selector: 'navigation',
    templateUrl: 'navigation.template.html'
})

export class NavigationComponent {
    
    constructor(
        public authenticationService: AuthenticationService
    ) {
    }


}
