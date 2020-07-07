import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {InfoPopupComponent} from "../../common/info-popup.component";
import {InitDashboardDto} from "../../../models/InitDashboardDto";
import {Study} from "../../../models/study/Study";

@Component({
    selector: 'app-new-study-dialog',
    templateUrl: './new-study-dialog.component.html',
    styleUrls: ['./new-study-dialog.component.scss']
})
export class NewStudyDialogComponent implements OnInit {

    newStudyForm: FormGroup;
    studySuccessfullyCreated = new EventEmitter();
    
    constructor(
        @Inject(MAT_DIALOG_DATA) public initDashboardDto: InitDashboardDto,
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private http: HttpClient
    ) {
    }

    ngOnInit() {
        this.newStudyForm = this.formBuilder.group({
            sponsor: this.formBuilder.group({
                id: ''
            }),
            protocolName: '',
            cro: this.formBuilder.group({
                id: ''
            }),
            nickname: '',
            indNumber: '',
            principalInvestigator: this.formBuilder.group({
                id: ''
            }),
            subInvestigator: this.formBuilder.group({
                id: ''
            }),
            site: this.formBuilder.group({
                id: ''
            }),
            siteNumber: '',
            leadCrc: this.formBuilder.group({
                id: ''
            }),
            backupCrc: this.formBuilder.group({
                id: ''
            })
        });
    }

    create(form) {
        this.dialog.closeAll();
        this.http.post<Study>(environment.serverUrl + '/study', form.value).subscribe(
            res => {
                if (res.errorMessage) {
                    this.showError(res.errorMessage);
                } else {
                    console.log(res);
                    this.studySuccessfullyCreated.emit();
                }
            },
            err => {
                this.showError(err.error.substr(err.error.indexOf('message: ') + 9));
            }
        );
    }

    private showError(errMessage: string) {
        this.dialog.open(InfoPopupComponent, {
            data: errMessage
        });
    }
}
