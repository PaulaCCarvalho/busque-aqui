import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Globals } from "../globals/globals";

@Injectable()
export class LoginGuard implements CanActivate, CanActivateChild{
    
    constructor(private router: Router, private globals: Globals){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        if(this.globals.loginData.token == ""){
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
       return this.canActivate(route,state); 
    }
}