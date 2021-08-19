import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuscripcionRoutingModule } from './suscripcion-routing.module';
import { CrearSuscripcionComponent } from './components/crear-suscripcion/crear-suscripcion/crear-suscripcion.component';
import { ListarSuscripcionComponent } from './components/listar-suscripcion/listar-suscripcion/listar-suscripcion.component';
import { SuscripcionComponent } from './components/suscripcion/suscripcion.component';
import { SuscripcionService } from './shared/service/suscripcion.service';



@NgModule({
  declarations: [
    CrearSuscripcionComponent,
    ListarSuscripcionComponent,
    SuscripcionComponent
  ],
  imports: [
    CommonModule,
    SuscripcionRoutingModule
  ],
  providers: [SuscripcionService]
})
export class SuscripcionModule { }
