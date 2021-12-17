import { Injectable } from "@angular/core";
import { Usuario } from "../login/login.component";

@Injectable()
export class Globals{
    loginData = new LoginData();
}

class LoginData{
    token: string = "";
    usuario: Usuario = new Usuario();
}