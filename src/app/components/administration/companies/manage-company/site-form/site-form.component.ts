import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Site} from "../../../../../models/Site";
import {SiteService} from "../../../../../services/http/site.service";

@Component({
    selector: 'app-site-form',
    template: `
        <form class="m-t pb-4 border-bottom" role="form" [formGroup]="formGroup" autocomplete="on"
              (ngSubmit)="update()">
            <mat-slide-toggle [color]="'primary'" class="float-right" formControlName="active">Active</mat-slide-toggle>
            <mat-form-field>
                <input type="text" matInput placeholder="Name" formControlName="name">
                <mat-error
                        *ngIf="formGroup.get('name').touched && formGroup.get('name').hasError('required')">
                    Required
                </mat-error>
            </mat-form-field>
            <mat-form-field>
                <input type="text" matInput placeholder="Address 1" formControlName="address1">
                <mat-error
                        *ngIf="formGroup.get('address1').touched && formGroup.get('address1').hasError('required')">
                    Required
                </mat-error>
            </mat-form-field>
            <mat-form-field>
                <input type="text" matInput placeholder="Address 2" formControlName="address2">
            </mat-form-field>
            <mat-form-field>
                <input type="text" matInput placeholder="City" formControlName="city">
            </mat-form-field>
            <mat-form-field>
                <input type="text" matInput placeholder="State" formControlName="state">
            </mat-form-field>
            <mat-form-field>
                <input type="text" matInput placeholder="Zip" formControlName="zip">
            </mat-form-field>
            <button type="submit" class="btn btn-w-m btn-info block full-width">Update</button>
        </form>
    `,
    styles: []
})
export class SiteFormComponent implements OnInit {
    formGroup: FormGroup;
    @Input() site: Site;

    constructor(
        private formBuilder: FormBuilder,
        private siteService: SiteService
    ) {
    }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            id: this.site.id,
            name: [this.site.name, Validators.required],
            company: this.formBuilder.group({
                id: this.site.company.id
            }),
            active: this.site.active,
            address1: [this.site.address1, Validators.required],
            address2: this.site.address2,
            city: this.site.city,
            state: this.site.state,
            zip: this.site.zip
        });
    }

    update() {
        if (this.formGroup.valid) {
            this.siteService.update(this.formGroup.value).subscribe(
                res => {
                    if (res.responseStatus != "SUCCESS") {
                        this.siteService.showError(res.responseMessage);
                    } else {
                        console.log(res);
                        this.siteService.showSuccess();
                    }
                },
                err => {
                    this.siteService.showError(err.error.substr(err.error.indexOf('message: ') + 9));
                }
            );
        } else {
            this.formGroup.markAllAsTouched();
        }
    }
}
