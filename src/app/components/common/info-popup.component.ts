import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-info-popup',
    template: `
        <div mat-dialog-content>
            <p>{{message}}</p>
        </div>
        <mat-dialog-actions align="end">
            <button mat-button mat-dialog-close class="btn btn-w-m btn-info block full-width">Close</button>
        </mat-dialog-actions>
    `,
})
export class InfoPopupComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public message: string) {
    }
}
