import { NgModule } from '@angular/core';
import { SuscripcionRoutingModule } from './suscripcion-routing.module';
import { CrearSuscripcionComponent } from './components/crear-suscripcion/crear-suscripcion/crear-suscripcion.component';
import { ListarSuscripcionComponent } from './components/listar-suscripcion/listar-suscripcion/listar-suscripcion.component';
import { SuscripcionComponent } from './components/suscripcion/suscripcion.component';
import { SuscripcionService } from './shared/service/suscripcion.service';
import { SharedModule } from '@shared/shared.module';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    CrearSuscripcionComponent,
    ListarSuscripcionComponent,
    SuscripcionComponent
  ],
  imports: [
    SuscripcionRoutingModule,
    SharedModule,

    //ANGULAR MATERIAL//
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [SuscripcionService]
})
export class SuscripcionModule { }
