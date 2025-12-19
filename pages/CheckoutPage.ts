import {Locator, Page, expect} from "@playwright/test";
import { User } from "../objects/User";
import { Product } from "../objects/Product";
import { TableData } from "../utilities/TableData.ts";
import { PaymentPage } from "./PaymentPage";
import { urls } from "../param/Urls";

export class CheckoutPage{
    readonly page: Page;
    readonly addDel: Locator;
    readonly addBill: Locator;
    readonly cartInfo: Locator;
    readonly placeOrderBtb: Locator;

    constructor(page: Page){
        this.page = page;
        this.addDel = this.page.locator('#address_delivery');
        this.addBill = this.page.locator('#address_invoice');
        this.cartInfo = this.page.locator('#cart_info');
        this.placeOrderBtb = this.page.getByRole('link', {name: 'Place Order'});
    }
    async evalAddressInfo(user: User){
        const fullname = `${user.firstName} ${user.lastName}`;
        const address = user.address1;
        const cityStatePostcode = `${user.city} ${user.state} ${user.zipcode}`;
        const country = user.country;
        const phone = user.phone;
        //Verify delivery address
        await expect(this.addDel).toContainText(fullname);
        await expect(this.addDel).toContainText(address);
        await expect(this.addDel).toContainText(cityStatePostcode);
        await expect(this.addDel).toContainText(country);
        await expect(this.addDel).toContainText(phone);
        //Verify billig address
        await expect(this.addBill).toContainText(fullname);
        await expect(this.addBill).toContainText(address);
        await expect(this.addBill).toContainText(cityStatePostcode);
        await expect(this.addBill).toContainText(country);
        await expect(this.addBill).toContainText(phone);
        }

    async evalCartInfo(order1st: Product, order2nd: Product){
        //Verify cart info
        const rowsLoc = this.cartInfo.locator('tbody').locator('tr');
        const parser = new TableData;
        const data: string[][] = await parser.parseTable(rowsLoc);
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
        expect(data[2][2]).toContain('Total Amount')
        expect(data[2][3]).toEqual('Rs. 1400');
    }

    async placeOrder(): Promise<PaymentPage>{
        await this.placeOrderBtb.click();
        await expect(this.page).toHaveURL(urls.payment);
        return new PaymentPage(this.page);
    }
}