import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "./AuthenticationService";

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private authenticationService: AuthenticationService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authenticationService.loginUserValue) {
            return true;
        } else {
            this.router.navigate(['login'], {
                queryParams: {
                    return: state.url
                }
            });
            return false;
        }
    }
}
