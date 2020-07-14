import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {InfoPopupComponent} from "../../common/info-popup.component";
import {InitDashboardDto} from "../../../models/InitDashboardDto";
import {Study} from "../../../models/Study";
import {Observable} from "rxjs";
import {map, startWith} from 'rxjs/operators';
import {Sponsor} from "../../../models/Sponsor";


@Component({
    selector: 'app-new-study-dialog',
    templateUrl: './new-study-dialog.component.html',
    styleUrls: ['./new-study-dialog.component.scss']
})
export class NewStudyDialogComponent implements OnInit {

    newStudyForm: FormGroup;
    studySuccessfullyCreated = new EventEmitter();
    study: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public initDashboardDto: InitDashboardDto,
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private http: HttpClient
    ) {
    }

    filteredSponsors: Observable<Sponsor[]>;
    filteredCros: Observable<Sponsor[]>;

    ngOnInit() {
        this.newStudyForm = this.formBuilder.group({
            sponsor: this.formBuilder.group({
                name: ['', Validators.required]
            }),
            protocolName: ['', Validators.required],
            cro: this.formBuilder.group({
                name: ''
            }),
            nickname: ['', Validators.required],
            indNumber: '',
            principalInvestigator: this.formBuilder.group({
                id: ['', Validators.required]
            }),
            subInvestigator: this.formBuilder.group({
                id: ''
            }),
            site: this.formBuilder.group({
                id: ['', Validators.required]
            }),
            siteNumber: '',
            leadCrc: this.formBuilder.group({
                id: ['', Validators.required]
            }),
            backupCrc: this.formBuilder.group({
                id: ''
            }),
            binderTemplate: this.formBuilder.group({
                id: ['', Validators.required]
            }),
        });
        this.filteredSponsors = this.newStudyForm.get('sponsor.name').valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value, this.initDashboardDto.sponsors))
        );
        this.filteredCros = this.newStudyForm.get('cro.name').valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value, this.initDashboardDto.cros))
        );
    }

    private _filter(value: string, items: Array<any>) {
        const filterValue = value.toLowerCase();
        return items.filter(item => item.name.toLowerCase().indexOf(filterValue) === 0);
    }

    submit() {
        if (this.newStudyForm.valid) {
            this.dialog.closeAll();
            this.http.post<Study>(environment.serverUrl + '/study', this.newStudyForm.value).subscribe(
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
        } else {
            this.newStudyForm.markAllAsTouched();
        }
    }

    private showError(errMessage: string) {
        this.dialog.open(InfoPopupComponent, {
            data: errMessage
        });
    }

}
