import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { TecwebService } from '../tecweb.service';
import { switchMap } from 'rxjs/operators';

export class Perfil{
  iduser: number | undefined;
  nome: string | undefined;
  email: any;
  profissao: string | undefined;
  categoria: string | undefined;
  endereco: string | undefined;
  num_endereco: any;
  bairro: any;
  cidade: string | undefined;
  estado: string | undefined;
  cep: any;
  telefone: string | undefined;
  descricao: string | undefined;
  classificacao: number = 0;
}

export class Feedback{
  email: any;
  comentario: any;
  profissional: any;
  classificacao!: number;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  message!: any;
  dataSource: Perfil[] = [];
  dataSourceFeed: Feedback[] = [];
  Id!: number;

  constructor(private service: TecwebService, private router: Router, private route: ActivatedRoute) { }

  
  ngOnInit(): void {
    this.Id = +this.route.snapshot.paramMap.get('id')!;

    this.service.getPerfil(this.Id).subscribe(perfil => this.dataSource = perfil);
    this.service.getFeed(this.Id).subscribe((feedback) => this.dataSourceFeed = feedback);
  }

  newMessage(message: any){
    this.service.changeMessage(message);
  }

}
