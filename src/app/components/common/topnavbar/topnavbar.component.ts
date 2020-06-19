import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/auth/AuthenticationService";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'topnavbar',
    templateUrl: 'topnavbar.template.html'
})
export class TopNavbarComponent implements OnInit {
    searchForm: FormGroup;

    constructor(
        public authenticationService: AuthenticationService,
        public formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.searchForm = this.formBuilder.group({
            text: ''
        });
    }


}
