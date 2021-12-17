import { Component, OnInit } from '@angular/core';
import { TecwebService } from '../tecweb.service';

export class Profissional{
  iduser: number | undefined;
  nome: string | undefined;
  profissao: string | undefined;
  cidade: string | undefined;
  estado: string | undefined;
  categoria: string | undefined;
  classificacao: number = 0;
}


@Component({
  selector: 'app-procurar',
  templateUrl: './procurar.component.html',
  styleUrls: ['./procurar.component.css']
})
export class ProcurarComponent implements OnInit {
  message!: any;
  dataSource: Profissional[] = [];
  data: Profissional = new Profissional;

  profissional: Profissional = {
    iduser: NaN,
    nome: '', 
    profissao: '',
    cidade: '',
    estado: '',
    categoria: '',
    classificacao: NaN
      
  }
  constructor(private service: TecwebService) { }

  ngOnInit(): void {
    this.service.currentMessage.subscribe(data =>{
      this.message = data;
    })
    this.service.getProfissional().subscribe(profissionais => this.dataSource = profissionais);
  }

  newMessage(profissional: Profissional){
    if(profissional.iduser){
      this.service.changeMessage(profissional.iduser);
    } 
  }

  passarId(profissional: Profissional){
    if(profissional.iduser){
      this.service.Idpass(profissional.iduser);
    }
  }

  buscar(){
    this.service.getBuscar(this.profissional).subscribe((profissionais) => {
      this.dataSource = profissionais;
    })
  }

}
