import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InitDashboardDto} from "../../../models/InitDashboardDto";
import {Observable} from "rxjs";
import {map, startWith} from 'rxjs/operators';
import {Sponsor} from "../../../models/Sponsor";
import {StudyService} from "../../../services/http/study.service";


@Component({
    selector: 'app-new-study-dialog',
    templateUrl: './new-study-dialog.component.html',
    styleUrls: ['./new-study-dialog.component.scss']
})
export class NewStudyDialogComponent implements OnInit {

    newStudyForm: FormGroup;
    @Output() studySuccessfullyCreated = new EventEmitter();
    study: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public initDashboardDto: InitDashboardDto,
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private studyService: StudyService,
    ) {
    }

    filteredSponsors: Observable<Sponsor[]>;
    filteredCros: Observable<Sponsor[]>;

    ngOnInit() {
        this.newStudyForm = this.formBuilder.group({
            sponsor: this.formBuilder.group({
                name: [null, Validators.required]
            }),
            protocol: [null, Validators.required],
            cro: this.formBuilder.group({
                name: null
            }),
            nickname: null,
            indNumber: null,
            principalInvestigator: [null, Validators.required],
            subInvestigator: null,
            site: [null, Validators.required],
            siteNumber: null,
            leadCrc: [null, Validators.required],
            backupCrc: null,
            structure: [[], Validators.required]
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
        return items.filter(item => {
            return item.name.toLowerCase().indexOf(filterValue) === 0
        });
    }

    submit() {
        if (this.newStudyForm.valid) {
            this.studyService.create(this.newStudyForm.value).subscribe(
                res => {
                    if (res.responseStatus != "SUCCESS") {
                        this.studyService.showError(res.responseMessage);
                    } else {
                        this.studySuccessfullyCreated.emit();
                        this.dialog.closeAll();
                        this.studyService.showSuccess()
                    }
                },
                err => {
                    this.studyService.showError(err.error.substr(err.error.indexOf('message: ') + 9));
                }
            );
        } else {
            this.newStudyForm.markAllAsTouched();
        }
    }

}
