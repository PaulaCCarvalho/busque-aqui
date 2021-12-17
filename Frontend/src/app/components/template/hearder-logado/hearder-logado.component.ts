import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals/globals';
import { TecwebService } from 'src/app/tecweb.service';

@Component({
  selector: 'app-hearder-logado',
  templateUrl: './hearder-logado.component.html',
  styleUrls: ['./hearder-logado.component.css']
})
export class HearderLogadoComponent implements OnInit {

  public usuario: number = this.globals.loginData.usuario.iduser;
  constructor(private globals: Globals, private router: Router, private service: TecwebService) { }

  ngOnInit(): void {
  }



  DeletarUsuario(){

    //console.log(this.globals.loginData.token)
    this.service.deleteProfissional(this.usuario).subscribe(resp => console.log('profissional deletado'));
    this.service.deleteUser(this.usuario).subscribe(resp => console.log('usuario deletado'));
    
    alert("Conta excluída com sucesso!")
    this.globals.loginData.token = "";
    this.router.navigate(['/']);
  }

  Deslogar(){
    this.globals.loginData.token = "";
    this.router.navigate(['/']);
  }

}
