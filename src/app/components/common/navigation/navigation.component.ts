import {Component} from '@angular/core';
import {AuthenticationService} from "../../../services/auth/AuthenticationService";

@Component({
    selector: 'navigation',
    templateUrl: 'navigation.template.html'
})

export class NavigationComponent {
    expand = false;
    accounTypeMap = {
        EXTERNAL: 'External',
        REGULAR_USER: 'Regular User',
        REGULATORY_USER: 'Regulatory User',
        COMPANY_ADMINISTRATOR: 'Company Administrator',
        SYSTEM_ADMINISTRATOR: 'System Administrator',
        SUPER_USER: 'Super User'
    };
    constructor(
        public authenticationService: AuthenticationService
    ) {
    }


}
