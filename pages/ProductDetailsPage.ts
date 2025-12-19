import { Locator, Page, expect } from "@playwright/test";
import { CartPage } from "./CartPage.ts"
import { Product } from "../objects/Product.ts";
import { urls } from "../param/Urls.ts";

export class ProductDetailsPage{
    readonly page: Page;
    readonly detailsLoc: Locator;
    readonly detailsInfoLoc: Locator;
    readonly imgLoc: Locator;
    readonly descLoc: Locator;
    readonly catLoc: Locator;
    readonly priceLoc: Locator;
    readonly qtyLoc: Locator;
    readonly availLoc: Locator;
    readonly condLoc: Locator;
    readonly brandLoc: Locator;
    readonly add2cartBtn: Locator;
    readonly addedOverlay: Locator;
    readonly viewCart: Locator;
    readonly contshopBtn: Locator;

    
    constructor(page: Page){
        this.page = page;
        this.detailsLoc = page.locator('div[class="product-details"]');
        this.imgLoc = this.page.locator('div[class="view-product"]').getByAltText('ecommerce website products');
        this.detailsInfoLoc = this.detailsLoc.locator('div[class="product-information"]');
        this.descLoc = this.detailsInfoLoc.locator('h2').first();
        this.catLoc = this.detailsInfoLoc.locator('p').first();
        this.priceLoc = this.detailsInfoLoc.locator('span').first().locator('span').first();
        this.qtyLoc = this.detailsInfoLoc.locator('#quantity');
        this.availLoc = this.detailsInfoLoc.locator('p', {hasText : "Availability:"});
        this.condLoc = this.detailsInfoLoc.locator('p', {hasText: "Condition:"});
        this.brandLoc = this.detailsInfoLoc.locator('p', {hasText: "Brand:"});
        this.add2cartBtn = this.detailsInfoLoc.getByRole('button') // Only 1 button element inside
        this.addedOverlay = this.page.locator('#cartModal');
        this.viewCart = this.addedOverlay.locator('a[href="/view_cart"]');
        this.contshopBtn = this.addedOverlay.getByRole('button');
    }

    async evalProdDetailsInfo(item: Product){
        await expect(this.imgLoc).toBeVisible();
        await expect(this.descLoc).toHaveText(item.itemDesc);
        await expect(this.catLoc).toContainText(item.itemCat);
        await expect(this.priceLoc).toHaveText(item.itemPrice);
        await expect(this.availLoc).toContainText(item.itemAvail);
        await expect(this.condLoc).toContainText(item.itemCondition);
        await expect(this.brandLoc).toContainText(item.itemBrand);
    }

    async add2Cart(qty: string, action: 'view' | 'continue'): Promise <CartPage | null>{
        await this.qtyLoc.fill(qty);
        await this.add2cartBtn.click();
        await expect(this.addedOverlay).toBeVisible();
        await expect(this.addedOverlay).toContainText('Added!');
        await expect(this.addedOverlay).toContainText('Your product has been added to cart.');
        await expect(this.viewCart).toContainText('View Cart')
        await expect(this.contshopBtn).toContainText('Continue Shopping');
        if (action === 'view'){
            await this.viewCart.click();
            await expect(this.page).toHaveURL(urls.cart);
            return new CartPage(this.page);
        } else {
            return null;
        }

    }
}