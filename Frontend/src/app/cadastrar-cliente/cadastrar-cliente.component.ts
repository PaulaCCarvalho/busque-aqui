import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TecwebService } from '../tecweb.service';


@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.css']
})
export class CadastrarClienteComponent implements OnInit {
  formulario!: FormGroup;

  constructor(private service: TecwebService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      email: [null],
      senha: [null],
      nome: [null],
      perfil: [null],
      confirm_senha: [null],
    });
  }

  onSubmit(){
    console.log(this.formulario);

  }

}
