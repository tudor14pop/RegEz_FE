import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {InfoPopupComponent} from "../../common/info-popup.component";
import {InitStudyDto} from "../../../models/study/InitStudyDto";
import {Study} from "../../../models/study/Study";

@Component({
    selector: 'app-new-study-dialog',
    templateUrl: './new-study-dialog.component.html',
    styleUrls: ['./new-study-dialog.component.scss']
})
export class NewStudyDialogComponent implements OnInit {

    newStudyForm: FormGroup;
    initStudy: InitStudyDto;

    constructor(
        private formBuilder: FormBuilder,
        public matDialog: MatDialog,
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
        this.http.get<InitStudyDto>(environment.serverUrl + '/study/init').subscribe(
            res => {
                if (res.errorMessage) {
                    this.showError(res.errorMessage);
                } else {
                    this.initStudy = res;
                }
            },
            err => {
                this.showError(err.error.substr(err.error.indexOf('message: ') + 9));
            }
        );
    }

    create(form) {
        this.matDialog.closeAll();
        this.http.post<Study>(environment.serverUrl + '/study', form.value).subscribe(
            res => {
                if (res.errorMessage) {
                    this.showError(res.errorMessage);
                } else {
                    console.log(res);
                }
            },
            err => {
                this.showError(err.error.substr(err.error.indexOf('message: ') + 9));
            }
        );
    }

    private showError(errMessage: string) {
        this.matDialog.open(InfoPopupComponent, {
            data: errMessage
        });
    }
}
