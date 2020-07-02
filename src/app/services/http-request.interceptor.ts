import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './auth/AuthenticationService';
import {Injectable, OnInit} from '@angular/core';
import {UtilService} from "./UtilService";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith(environment.serverUrl)) {
            let token = localStorage.getItem('regEz.token');
            req = req.clone({
                headers: req.headers
                    .append('X-FORWARDED-FOR', localStorage.getItem('regEz.ip'))
                    .append('Authorization', token !== null ? token : '')
            });
        }
        return next.handle(req);
    }
}
