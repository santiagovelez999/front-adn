import { by, element } from "protractor";


export class SuscripcionPage {

    //Linsk
    private linkCrearSuscripcion = element(by.id('linkCrearSuscripcion'));
    private linkListarSuscripcion = element(by.id('linkListarSuscripcion'));

    //Campos de texto
    private inputIdCliente = element(by.id('idCliente'));
    private inputValorSuscripcion = element(by.id('valorSuscripcion'));
    private inputFechaRegistro = element(by.id('fechaRegistro'));

    //Selectores
    private selectTipoSuscripcion = element(by.id('tipoSuscripcion'));

    //Tabla
    private listaSuscripciones = element.all(by.css('#tablaListarSuscripcion > thead > tr > th.mat-header-cell.cdk-header-cell'));

    //Botones
    private BotonCrear= element(by.id('botonCrearSuscripcion'));
    private BotonCerrar = element(by.id('botonCerrarCrearSuscripcion'));

    async clickBotonCrearSuscripcion() {
        await this.linkCrearSuscripcion.click();
    }

    async clickBotonListaruscripcion() {
        await this.linkListarSuscripcion.click();
    }

    async clickBotonCrear() {
        await this.BotonCrear.click();
    }

    async clickBotonCerrar () {
        await this.BotonCerrar.click();
    }


    async ingresarIdCliente(idCliente) {
        await this.inputIdCliente.sendKeys(idCliente);
    }

    async ingresarValorSuscripcion(valorSuscripcion) {
        await this.inputValorSuscripcion.sendKeys(valorSuscripcion);
    }

    async ingresarFechaRegistro(fechaRegistro) {
        await this.inputFechaRegistro.sendKeys(fechaRegistro);
    }

    async seleccionarTipoSuscripcion(tipoSuscripcion) {
        await this.selectTipoSuscripcion.selectByValue(tipoSuscripcion);
    }

    async contarSuscripcion() {
        console.log(this.listaSuscripciones.count());
        return this.listaSuscripciones.count();
    }
}