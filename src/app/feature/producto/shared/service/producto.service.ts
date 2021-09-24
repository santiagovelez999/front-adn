import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Producto } from '../model/producto';


@Injectable()
export class ProductoService {

  constructor(protected http: HttpService) {}

  public consultar(page:number, size:number) {
    let URL = "http://localhost:8080/productos?page=" + page +"&size=" + size + "";
    return this.http.doGet<Producto[]>(URL, this.http.optsName('consultar productos'));
  }

  public guardar(producto: Producto) {
    return this.http.doPost<Producto, boolean>(`${environment.endpoint}/productos`, producto,
                                                this.http.optsName('crear/actualizar productos'));
  }

  public eliminar(producto: Producto) {
    return this.http.doDelete<boolean>(`${environment.endpoint}/productos/${producto.id}`,
                                                 this.http.optsName('eliminar productos'));
  }
}
