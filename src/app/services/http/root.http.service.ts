import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from "@angular/material/dialog";
import {InfoPopupComponent} from "../../components/common/info-popup.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SuccessMessageComponent} from "./success-message.component";

@Injectable({
    providedIn: 'root'
})
export class RootHttpService {

    constructor(
        public http: HttpClient,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar
    ) {
    }

    public showError(errMessage: string) {
        this.dialog.open(InfoPopupComponent, {
            data: errMessage
        });
    }

    showSuccess() {
        this._snackBar.openFromComponent(SuccessMessageComponent, {
            duration: 3000,
        });
    }
}

