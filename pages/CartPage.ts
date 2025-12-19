import {Locator, Page, expect} from "@playwright/test";
import {urls} from "../param/Urls.ts";
import { Product } from "../objects/Product.ts";
import { TableData } from "../utilities/TableData.ts";
import { CheckoutPage } from "./CheckoutPage.ts";

export class CartPage{
    readonly page: Page;
    readonly cartSection: Locator;
    readonly title: Locator;
    readonly checkOutBtn: Locator;
    readonly cartInfo: Locator;
    readonly rowsLoc: Locator;


    constructor (page: Page){
        this.page = page;
        this.cartSection = this.page.locator('#cart_items');
        this.title = this.cartSection.locator('div[class="breadcrumbs"]').locator('li[class="active""]');
        this.checkOutBtn = this.page.locator('#do_action').locator('a', {hasText: 'Proceed To Checkout'});;
        this.cartInfo = this.page.locator('#cart_info_table');
        this.rowsLoc = this.cartInfo.locator('tbody').locator('tr');
    }
    //Hardcoded to test in case only 2 products is added
    async evalCartInfo(order1st: Product, order2nd: Product){
        const parser = new TableData;
        const data: string[][] = await parser.parseTable(this.rowsLoc);
        expect(data[0][1]).toContain(order1st.itemDesc);
        expect(data[0][1]).toContain(order1st.itemCat);
        expect(data[0][2]).toContain(order1st.itemPrice);
        expect(data[0][3]).toEqual('1');
        expect(data[0][4]).toEqual('Rs. 400');
        expect(data[1][1]).toContain(order2nd.itemDesc);
        expect(data[1][1]).toContain(order2nd.itemCat);
        expect(data[1][2]).toContain(order2nd.itemPrice);
        expect(data[1][3]).toEqual('2');
        expect(data[1][4]).toEqual('Rs. 1000');
    }
    async clearCart(){
        var rows = await this.rowsLoc.count();
        if (rows > 0){
            for (var i = 0; i < rows; i++){
                await this.rowsLoc.first().locator('td').last().locator('a').click();
                await this.page.waitForLoadState('load');
                await this.page.waitForTimeout(100);
            }
        }
    }
    async goCheckOut(): Promise<CheckoutPage>{
        await this.checkOutBtn.click();
        await this.page.waitForLoadState('load');
        await expect(this.page).toHaveURL(urls.checkout);
        return new CheckoutPage(this.page);
    }
}