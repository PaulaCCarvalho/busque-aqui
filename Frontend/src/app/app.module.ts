import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProcurarComponent } from './procurar/procurar.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { HomeComponent } from './home/home.component';


import { CadastrarClienteComponent } from './cadastrar-cliente/cadastrar-cliente.component';
import { LoginComponent } from './login/login.component';
import { SlideComponent } from './components/template/slide/slide.component';

import { HttpClientModule } from '@angular/common/http'

import {FormsModule, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { PerfilComponent } from './perfil/perfil.component';
import { CadastrarProfissionalComponent } from './cadastrar-profissional/cadastrar-profissional.component';

import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CadastrarClienteComponent,
    LoginComponent,
    SlideComponent,
    PerfilComponent,
    ProcurarComponent,
    CadastrarProfissionalComponent
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    
    ReactiveFormsModule
  ],
  exports: [
    
  ],
  providers: [FormGroup,],
  bootstrap: [AppComponent]
})
export class AppModule { }
