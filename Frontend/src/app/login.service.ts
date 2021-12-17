import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(login:string, senha: string): Observable<LoginResponse>{
    return this.http.post<LoginResponse>('http://localhost:3000/login',{
      email: login,
      senha: senha
    })
  }

}
