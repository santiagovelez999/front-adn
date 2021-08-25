export class Suscripcion {

    idSuscripcion: number;
    idCliente: number;
    valorSuscripcion: number;
    tipoSuscripcion: string;
    fechaRegistro: Date;

    constructor(idSuscripcion: number, idCliente: number, valorSuscripcion: number,
                tipoSuscripcion: string, fechaRegistro: Date) {
        this.idSuscripcion = idSuscripcion;
        this.idCliente = idCliente;
        this.valorSuscripcion = valorSuscripcion;
        this.tipoSuscripcion = tipoSuscripcion;
        this.fechaRegistro = fechaRegistro;
    }
}
