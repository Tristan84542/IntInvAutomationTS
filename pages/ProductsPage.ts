import { Locator, Page, expect } from "@playwright/test";
import { urls, parturls } from "../param/Urls.ts";
import { Product } from "../objects/Product.ts";
import { CartPage } from "./CartPage.ts";
import { ProductDetailsPage } from "./ProductDetailsPage.ts";


export class ProductsPage {
    readonly page: Page;
    readonly category: Locator;
    readonly brands: Locator;
    readonly itemPanel: Locator;
    readonly itemGrid: Locator;
    readonly add2CartPopup: Locator;
    readonly viewCart: Locator;
    readonly contShoppingBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.category = page.locator('#accordian');
        this.brands = page.locator('div[class="brands-name"]');
        this.itemPanel = page.locator('div[class="features_items"]');
        this.itemGrid = this.itemPanel.locator('div[class="col-sm-4"]');
        this.add2CartPopup = page.locator('#cartModal');
        this.viewCart = this.add2CartPopup.getByRole('link', {name: 'View Cart'});
        this.contShoppingBtn = this.add2CartPopup.getByRole('button', {name: 'Continue Shopping'});
    }
    async filterByCat(main: RegExp, sub: RegExp) {
        const mainCat = this.category.getByText(main);
        const id = `#${main.source}`;
        const subCat = this.page.locator(id);
        await mainCat.click();
        await expect(subCat).toBeVisible();
        await subCat.getByText(sub).click();
        //Assert page is refreshed to show categorized product
        await expect(this.page).toHaveURL(parturls.category);
    }
    async filterByBrand(brand: string) {
        this.brands.getByText(brand).click();
        await expect(this.page).toHaveURL(parturls.brand);
    }
    async goItemDetails(nth: number): Promise<ProductDetailsPage> {
        //To open specific item details
        //Nth = 0 is the added to cart popup
        if (nth === 0) {
            throw new Error("nth need to be at least 1");
        } else {
            //Open the item details
            //the itemgrid locator skipped the add to cart popup so first item in the feature_item grid has nth(0)
            await this.itemGrid.nth(nth -1).locator('div[class="choose"]').locator('a').click();
            await expect(this.page).toHaveURL(parturls.details);
            return new ProductDetailsPage(this.page);
        }
    }
    async evalProductsInfo(nth: number, product: Product) {
        //div nth = 1 is add to cart popup
        if (nth === 0) {
            throw new Error("nth need to be at least 1");
        } else {
            //the itemgrid locator skipped the add to cart popup so first item in the feature_item grid has nth(0)
            const targetGrid = this.itemGrid.nth(nth -1).locator('div[class*="productinfo"]');
            const targetOverlay = this.itemGrid.nth(nth -1).locator('div[class="product-overlay"]');
            await expect(targetGrid).toContainText(product.itemPrice);
            await expect(targetGrid).toContainText(product.itemDesc);
            await expect(targetOverlay).toContainText(product.itemPrice);
            await expect(targetOverlay).toContainText(product.itemDesc);
        }
    }
    async add2Cart(nth: number, action: 'view' | 'continue'): Promise<CartPage | null>{
        //nth = 0 is add to cart popup
        if (nth === 0){
            throw new Error("nth need ot be at least 1");
        } else {
            //the itemgrid locator skipped the add to cart popup so first item in the feature_item grid has nth(0)
            const add2CartBtn = this.itemGrid.nth(nth -1).locator('div[class*="productinfo"]').locator('a');
            await add2CartBtn.click();
            await expect(this.add2CartPopup).toBeVisible();
            await expect(this.add2CartPopup).toContainText('Added!');
            await expect(this.add2CartPopup).toContainText('Your product has been added to cart.');
            await expect(this.viewCart).toBeVisible();
            await expect(this.viewCart).toContainText('View Cart');
            await expect(this.contShoppingBtn).toBeVisible();
            if (action === 'view'){
                await this.viewCart.click();
                await expect(this.page).toHaveURL(urls.cart);
                return new CartPage(this.page);
            } else {
                await this.contShoppingBtn.click();
                return null;
            }
        }
    }

}