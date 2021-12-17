import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../globals/globals';
import { LoginService } from '../login.service';

export class LoginResponse {
  token!: string;
  usuario!: Usuario;
  success!: boolean;
}

export class Usuario {
  iduser: number = 0;
  login: string = "";
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login: string = "";
  public senha: string = "";

  public loginInvalido: boolean = false;

  constructor(private loginService: LoginService, private router: Router, private globals: Globals) { }

  ngOnInit(): void {
    this.loginInvalido = false;
  }

  logar() {

      this.loginService.login(this.login, this.senha).subscribe(response => {
        
        if (response.success == true) {
          
          this.globals.loginData.token = response.token;
          this.globals.loginData.usuario = response.usuario;
          this.loginInvalido = false;
          this.router.navigate(['/procurar']);
        }
        else {
          this.loginInvalido = true;
        }
      }, err => {
        this.loginInvalido = true;
      });
  }
}
