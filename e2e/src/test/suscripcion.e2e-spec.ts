import { AppPage } from '../app.po';
import { NavbarPage } from '../page/navbar/navbar.po';
import { SuscripcionPage } from '../page/suscripcion/suscripcion.po';

describe('workspace-project Suscripcion', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let suscripcion: SuscripcionPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        suscripcion = new SuscripcionPage();
    });

    it('Deberia crear suscripcion', () => {
        const ID_CLIENTE = '1';
        const VALOR_SUSCRIPCION = '70000';
        const TIPO_SUSCRIPCION = 'XXX';
        const FECHA_REGISTRO = new Date();

        page.navigateTo();
        navBar.clickBotonSuscripcion();
        suscripcion.clickBotonListaruscripcion();
        suscripcion.clickBotonCrearSuscripcion();
        suscripcion.ingresarIdCliente(ID_CLIENTE);
        suscripcion.ingresarValorSuscripcion(VALOR_SUSCRIPCION);
        suscripcion.seleccionarTipoSuscripcion(TIPO_SUSCRIPCION);
        suscripcion.ingresarFechaRegistro(FECHA_REGISTRO);
        suscripcion.clickBotonCrear();
    });

    it('Deberia actualizar', () => {
        const FECHA_REGISTRO = new Date();

        page.navigateTo();
        navBar.clickBotonSuscripcion();
        suscripcion.clickBotonListaruscripcion();
        suscripcion.clickBotonActualizarSuscripcion();
        suscripcion.ingresarFechaRegistro(FECHA_REGISTRO);
        suscripcion.clickBotonCrear();
    });
});
