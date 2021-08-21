import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Suscripcion } from '../model/suscripcion';
import { SuscripcionInterface } from '../model/suscripcionInterface';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {

  private nombreEntidad = "/suscripcion";

  constructor(protected http: HttpClient) {}

  public consultar() {
    return this.http.get<Suscripcion[]>(`${environment.endpoint}${this.nombreEntidad}` );
  }

  public guardar(suscripcion: SuscripcionInterface) {
    return this.http.post<any>(`${environment.endpoint}${this.nombreEntidad}`, suscripcion);
  }

  public actualizar(suscripcion: SuscripcionInterface) {
    return this.http.put<any>(`${environment.endpoint}${this.nombreEntidad}/${suscripcion.idSuscripcion}`, suscripcion);
  }
}
