import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TecwebService } from '../tecweb.service';

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.css']
})
export class CadastrarClienteComponent implements OnInit {
  public formulario!: FormGroup
  constructor( private service: TecwebService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      email: [null],
      senha: [null],
      nome: [null],
      confirm_senha: [null],
    });

  }

  onSubmit(){
    console.log(this.formulario.get('senha'), this.formulario.get('confirm_senha'))
    if (this.formulario.get('senha')?.value === this.formulario.get('confirm_senha')?.value){
      this.service.postUser(this.formulario).subscribe(res=>{
        alert("Usuário cadastrado com sucesso!");
      });
      this.router.navigate(['/login']);

    }else{
      alert("As senhas não são iguais!");
    }

    
    
  }

}
