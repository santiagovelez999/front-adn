import { by, element } from 'protractor';

export class NavbarPage {
    linkHome = element(by.xpath('/html/body/app-root/app-navbar/nav/a[1]'));
    linkSuscricpion = element(by.xpath('/html/body/app-root/app-navbar/nav/a[3]'));

    async clickBotonSuscripcion() {
        await this.linkSuscricpion.click();
    }
}
