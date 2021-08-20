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
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';


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
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule

  ],
  providers: [SuscripcionService]
})
export class SuscripcionModule { }
