import {test} from "@playwright/test";
import {HomePage} from "../pages/HomePage.ts";
import { initWBlueTop } from "../objects/Product.ts";
import { mainCat, wCat } from "../param/ProductFilter.ts";

test('User browsing product and product details page', async({page}) => {
    //Login is not mandatory in this case
    const testPage = new HomePage(page);
    const testItem = initWBlueTop();
    await testPage.goHome();
    //Filter by women - tops
    const prodP = await testPage.goProduct();
    await prodP.filterByCat(mainCat.women, wCat.tops);
    //Assert specific item present in grid with correct info
    await prodP.evalProductsInfo(1, testItem);
    const detailP = await prodP.goItemDetails(1);
    //Assert test item info present in page
    await detailP.evalProdDetailsInfo(testItem);

});