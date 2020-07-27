import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './auth/AuthenticationService';
import {Injectable, OnInit} from '@angular/core';
import {UtilService} from './UtilService';
import {environment} from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith(environment.serverUrl)) {
            const token = localStorage.getItem('regEz.token');
            req = req.clone({
                headers: req.headers
                    .append('X-FORWARDED-FOR', localStorage.getItem('regEz.ip'))
                    .append('Authorization', (token !== null && token !== 'null') ? token : '')
            });
        }
        return next.handle(req).pipe( tap(() => {},
        (err: any) => {
        if (err instanceof HttpErrorResponse) {
            if (err.status !== 403) {
            return;
            }
            this.router.navigate(['']);
        }
    }));

    }
}
