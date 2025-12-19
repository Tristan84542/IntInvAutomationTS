import {Locator, Page, expect} from "@playwright/test";
import {LoginPage} from "./LoginPage.ts"
import {urls} from "../param/Urls.ts";
import { ProductsPage } from "./ProductsPage.ts";
import { CartPage } from "./CartPage.ts";

export class HomePage{
    readonly page: Page;
    readonly header: Locator;
    readonly productsLoc: Locator;
    readonly cartLoc: Locator;
    readonly loginLoc: Locator;
    readonly logoutLoc: Locator;
    readonly deleteLoc: Locator;
    readonly logAsLoc: Locator;
    readonly caseLoc: Locator;
    readonly apiLoc: Locator;
    readonly videoTutorialLoc: Locator;
    readonly contactLoc: Locator;
    readonly logoLoc: Locator;
    readonly delContBtn: Locator;

    constructor( page: Page) {
        this.page = page;
        this.header = this.page.locator('#header')
        this.productsLoc = this.header.locator( 'a[href="/products"]');
        this.cartLoc = this.header.locator('a[href="/view_cart"]');
        this.loginLoc = this.header.locator('a[href="/login"]');
        this.logoutLoc = this.header.locator('a[href="/logout"]');
        this.deleteLoc = this.header.locator('a[href="/delete_account"]');
        this.logAsLoc = this.header.locator('a').getByText(/Logged in as/);
        this.caseLoc = this.header.locator('a[href="/test_cases"]');
        this.apiLoc = this.header.locator('a[href="/api_list"]');
        this.videoTutorialLoc = this.header.locator('a[href="https://www.youtube.com/c/AutomationExercise"]');
        this.contactLoc = this.header.locator('a[href="/contact_us"]');
        this.logoLoc = this.header.getByAltText('Website for automation practice');
        this.delContBtn = this.page.locator('a[data-qa="continue-button"]');
    }

    async goHome(){
        await this.page.goto(urls.home);
        //Clear cookies popup
        if (await this.page.locator('button[aria-label="Consent"]').count() > 0){
            await this.page.locator('button[aria-label="Consent"]').click();
        }
        await expect(this.page).toHaveURL(urls.home);
    }
    async goProduct(): Promise<ProductsPage>{
        await this.productsLoc.click();
        await expect(this.page).toHaveURL(urls.products);
        await expect(this.productsLoc).toBeVisible();
        await expect(this.cartLoc).toBeVisible();
        //Login / logout / delete / login as are dynamic so not use for check asserting page is stable
        await expect(this.caseLoc).toBeVisible();
        await expect(this.apiLoc).toBeVisible();
        await expect(this.videoTutorialLoc).toBeVisible();
        await expect(this.contactLoc).toBeVisible();
        await expect(this.logoLoc).toBeVisible;
        return new ProductsPage(this.page);
    }

    async goCart(): Promise<CartPage>{
        await this.cartLoc.click()
        return new CartPage(this.page);
    }

    async goLogin(): Promise<LoginPage>{
        await this.loginLoc.click();
        return new LoginPage(this.page);
    }

    async goLogout(){
        await this.logoutLoc.click();
    }
    async deleteAcc(){
        await this.deleteLoc.click();
        await expect(this.page).toHaveURL(urls.delAcc);
        await this.delContBtn.click();
        await expect(this.page).toHaveURL(urls.home);

    }
    async evalLogUser(user: string){
        const loggedUser = await this.logAsLoc.innerText();
        expect(loggedUser).toContain(user);
    }
    async evalNoUser(){
        await expect(this.loginLoc).toBeVisible();
    }
}