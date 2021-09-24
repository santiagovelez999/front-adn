import { NgModule } from '@angular/core';

import { ProductoRoutingModule } from './producto-routing.module';
import { BorrarProductoComponent } from './components/borrar-producto/borrar-producto.component';
import { ListarProductoComponent } from './components/listar-producto/listar-producto.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { ProductoComponent } from './components/producto/producto.component';
import { SharedModule } from '@shared/shared.module';
import { ProductoService } from './shared/service/producto.service';

import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    CrearProductoComponent,
    ListarProductoComponent,
    BorrarProductoComponent,
    ProductoComponent
  ],
  imports: [
    ProductoRoutingModule,
    SharedModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatSortModule,
    // Flex-Layout
    FlexLayoutModule
  ],
  providers: [ProductoService]
})
export class ProductoModule { }
