import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearSuscripcionComponent } from './components/crear-suscripcion/crear-suscripcion/crear-suscripcion.component';
import { ListarSuscripcionComponent } from './components/listar-suscripcion/listar-suscripcion/listar-suscripcion.component';
import { SuscripcionComponent } from './components/suscripcion/suscripcion.component';

const routes: Routes = [
  {
    path: '',
    component: SuscripcionComponent,
    children: [
      {
        path: 'crear',
        component: CrearSuscripcionComponent
      },
      {
        path: 'listar',
        component: ListarSuscripcionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuscripcionRoutingModule { }
