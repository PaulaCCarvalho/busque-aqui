import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TecwebService } from '../tecweb.service';

@Component({
  selector: 'app-cadastrar-profissional',
  templateUrl: './cadastrar-profissional.component.html',
  styleUrls: ['./cadastrar-profissional.component.css']
})
export class CadastrarProfissionalComponent implements OnInit {

  public formulario!: FormGroup;

  constructor(private service: TecwebService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: [null],
      senha: [null],
      nome: [null],
      confirm_senha: [null],
      profissao: [null],
      categoria: [null],
      endereco: [null],
      bairro: [null],
      numero: [null],
      cidade: [null],
      cep: [null],
      estado: [null],
      descricao: [null],
      telefone: [null],
      
    });

  }

  onSubmit(){
    console.log(this.formulario.get('senha'), this.formulario.get('confirm_senha'))
    if (this.formulario.get('senha')?.value === this.formulario.get('confirm_senha')?.value){
      this.service.postProfissional(this.formulario).subscribe(res=>{
        alert("Profissional cadastrado com sucesso!");
      });

    }else{
      alert("As senhas não são iguais!");
    }
    
  }

}
