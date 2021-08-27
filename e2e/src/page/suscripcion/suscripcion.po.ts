import { by, element } from 'protractor';


export class SuscripcionPage {

    // Linsk
    private linkCrearSuscripcion = element(by.id('linkCrearSuscripcion'));
    private linkActualizarSuscripcion = element(by.id('linkActualizarSuscripcion'));
    private linkListarSuscripcion = element(by.id('linkListarSuscripcion'));
    private linkEliminarSuscripcion = element(by.id('linkEliminarSuscripcion'));

    // Campos de texto
    private inputIdCliente = element(by.id('idCliente'));
    private inputValorSuscripcion = element(by.id('valorSuscripcion'));
    private inputFechaRegistro = element(by.id('fechaRegistro'));

    // Selectores
    private selectTipoSuscripcion = element(by.id('tipoSuscripcion'));

    // Botones
    private BotonCrear = element(by.id('botonCrearSuscripcion'));
    private BotonCerrar = element(by.id('botonCerrarCrearSuscripcion'));

    async clickBotonCrearSuscripcion() {
        await this.linkCrearSuscripcion.click();
    }

    async clickBotonActualizarSuscripcion() {
        await this.linkActualizarSuscripcion.click();
    }

    async clickBotonListaruscripcion() {
        await this.linkListarSuscripcion.click();
    }

    async clickBotonEliminaruscripcion() {
        await this.linkEliminarSuscripcion.click();
    }

    async clickBotonCrear() {
        await this.BotonCrear.click();
    }

    async clickBotonCerrar() {
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
}
