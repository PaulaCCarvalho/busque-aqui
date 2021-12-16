import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Feedback, Perfil } from './perfil/perfil.component';
import { Profissional } from './procurar/procurar.component';

@Injectable({
  providedIn: 'root'
})
export class TecwebService {
  static Iduser: number;
  constructor(private http: HttpClient) {}

  Idpass(Id: number){
    TecwebService.Iduser = Id;
  }

  private messageSource = new Subject<number>();
  currentMessage = this.messageSource.asObservable();

  changeMessage(newMessage: number){
    this.messageSource.next(newMessage); 
  }

  getProfissional(): Observable<Profissional[]>{
    return this.http.get<Profissional[]>("http://localhost:3000/profissional");
  }

  getPerfil(Iduser: number): Observable<Perfil[]>{
    return this.http.get<Perfil[]>("http://localhost:3000/profissional/" +Iduser);
  }

  getFeed(Iduser: number): Observable<Feedback[]>{
    return this.http.get<Feedback[]>("http://localhost:3000/feedback/" +Iduser);
  }

/*   getBuscar(profissional: Profissional): Observable<Profissional>{
    return this.http.get("http://localhost:3000/profissional-busca",profissional);
  } */
   
  
}


