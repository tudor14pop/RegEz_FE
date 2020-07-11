import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NewStudyDialogComponent} from './new-study-dialog/new-study-dialog.component';
import {InitDashboardDto} from "../../models/InitDashboardDto";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {InfoPopupComponent} from "../common/info-popup.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Study} from "../../models/study/Study";
import {RetrieveStudiesResponse} from "../../models/study/RetrieveStudiesResponse";
declare var $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    clicked = [].fill(false);
    initDashboardDto: InitDashboardDto;
    studyFilterForm: FormGroup;
    studies: Array<Study>;

    constructor(
        public dialog: MatDialog,
        private formBuilder: FormBuilder,
        private http: HttpClient
    ) {
    }

    openNewStudyDialog() {
        const dialogRef = this.dialog.open(NewStudyDialogComponent, {
            height: '50rem',
            width: '30rem',
            data: this.initDashboardDto
        });
        const sub = dialogRef.componentInstance.studySuccessfullyCreated.subscribe(() => {
            this.initStudies(this.studyFilterForm.value.investigatorId, this.studyFilterForm.value.siteId, this.studyFilterForm.value.companyId, this.studyFilterForm.value.keywords)
        });
    }

    ngOnInit() {
        this.studyFilterForm = this.formBuilder.group({
            companyId: "",
            siteId: "",
            investigatorId: "",
            keywords: ""
        });
        this.http.get<InitDashboardDto>(environment.serverUrl + '/dashboard/init').subscribe(
            res => {
                if (res.errorMessage) {
                    this.showError(res.errorMessage);
                } else {
                    this.initDashboardDto = res;
                }
            },
            err => {
                this.showError(err.error.substr(err.error.indexOf('message: ') + 9));
            }
        );
        this.initStudies("", "", "", "");
    }

    private initStudies(investigatorId, siteId, companyId, keywords) {
        let params = new HttpParams().set("investigatorId", investigatorId).set("siteId", siteId).set("companyId", companyId).set("keywords", keywords);
        this.http.get<RetrieveStudiesResponse>(environment.serverUrl + '/study/all', {params}).subscribe(
            res => {
                if (res.errorMessage) {
                    this.showError(res.errorMessage);
                } else {
                    this.studies = res.studies;
                }
            },
            err => {
                this.showError(err.error.substr(err.error.indexOf('message: ') + 9));
            }
        );
    }

    showPopup(i) {
        this.clicked[i] = !this.clicked[i];
    }

    private showError(errMessage: string) {
        this.dialog.open(InfoPopupComponent, {
            data: errMessage
        });
    }

    filter(studyFilterForm: FormGroup) {
        console.log(studyFilterForm.value);
        this.initStudies(studyFilterForm.value.investigatorId, studyFilterForm.value.siteId, studyFilterForm.value.companyId, studyFilterForm.value.keywords)
    }
}
