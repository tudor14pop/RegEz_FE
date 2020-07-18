import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from "@angular/material/dialog";
import {InfoPopupComponent} from "../../components/common/info-popup.component";

@Injectable({
    providedIn: 'root'
})
export class RootHttpService {

    constructor(
        public http: HttpClient,
        private dialog: MatDialog,
    ) {
    }

    public showError(errMessage: string) {
        this.dialog.open(InfoPopupComponent, {
            data: errMessage
        });
    }
}
