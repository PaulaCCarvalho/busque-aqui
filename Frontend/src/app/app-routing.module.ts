import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProcurarComponent } from './procurar/procurar.component';
import { CadastrarClienteComponent } from './cadastrar-cliente/cadastrar-cliente.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CadastrarProfissionalComponent } from './cadastrar-profissional/cadastrar-profissional.component';

const routes: Routes = [
  { path: 'procurar', component: ProcurarComponent},
  { path: '', component: HomeComponent},
  { path: 'cadastrar/cliente', component: CadastrarClienteComponent},
  { path: 'login', component: LoginComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: 'cadastrar/profissional', component: CadastrarProfissionalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
