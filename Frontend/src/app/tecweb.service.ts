import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Feedback, Perfil } from './perfil/perfil.component';
import { Profissional } from './procurar/procurar.component';

@Injectable({
  providedIn: 'root'
})
export class TecwebService {
  static Iduser: number;
  constructor(private http: HttpClient) { }

  Idpass(Id: number) {
    TecwebService.Iduser = Id;
  }

  private messageSource = new Subject<number>();
  currentMessage = this.messageSource.asObservable();

  changeMessage(newMessage: number) {
    this.messageSource.next(newMessage);
  }

  getProfissional(): Observable<Profissional[]> {
    return this.http.get<Profissional[]>("http://localhost:3000/profissional");
  }

  getPerfil(Iduser: number): Observable<Perfil[]> {
    return this.http.get<Perfil[]>("http://localhost:3000/profissional/" + Iduser);
  }

  getFeed(Iduser: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>("http://localhost:3000/feedback/" + Iduser);
  }

  postUser(formulario: FormGroup): Observable<any> {
    return this.http.post<any>("http://localhost:3000/user", {
      "nome": formulario.get('nome')?.value,
      "email": formulario.get('email')?.value,
      "senha": formulario.get('senha')?.value,
    });
  }

  getBuscar(profissional: Profissional): Observable<Profissional[]>{
      return this.http.post<Profissional[]>("http://localhost:3000/profissional-busca", profissional);
  }

  postProfissional(formulario: FormGroup): Observable<any> {
    return this.http.post<any>("http://localhost:3000/profissional", {
      "nome": formulario.get('nome')?.value,
      "email": formulario.get('email')?.value,
      "senha": formulario.get('senha')?.value,
      "profissao": formulario.get('profissao')?.value,
      "categoria": formulario.get('categoria')?.value,
      "endereco": formulario.get('endereco')?.value,
      "bairro": formulario.get('bairro')?.value,
      "num_endereco": formulario.get('numero')?.value,
      "cidade": formulario.get('cidade')?.value,
      "cep": formulario.get('cep')?.value,
      "estado": formulario.get('estado')?.value,
      "descricao": formulario.get('descricao')?.value,
      "telefone": formulario.get('telefone')?.value,
    });
  }


}


