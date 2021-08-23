import { by, element } from "protractor";


export class suscripcionPage {

    //Linsk
    private linkCrearSuscripcion = element(by.id('linkCrearSuscripcion'));
    private linkListarSuscripcion = element(by.id('linkListarSuscripcion'));

    //Inputs
    private inputIdCliente = element(by.id('idCliente'));
    private inputValorSuscripcion = element(by.id('valorSuscripcion'));
    private inputFechaRegistro = element(by.id('fechaRegistro'));

    //Select
    private selectTipoSuscripcion = element(by.id('tipoSuscripcion'));


    async clickBotonCrearSuscripcion() {
        await this.linkCrearSuscripcion.click();
    }

    async clickBotonListaruscripcion() {
        await this.linkListarSuscripcion.click();
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

}