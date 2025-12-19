import {test} from "@playwright/test";
import {HomePage} from "../pages/HomePage.ts";
import { initWBlueTop, MTshirt } from "../objects/Product.ts";
import { existUser } from "../objects/User.ts";
import { testCard } from "../objects/Card.ts";

test.beforeEach(async ({page}) => {
    console.log('Clear shopping cart if item is inside')
    //Login as existing user first
    const testUser = existUser();
    const homePage = new HomePage(page);
    await homePage.goHome();
    const loginPage = await homePage.goLogin();
    const loggedPage = await loginPage.login(testUser);
    await loggedPage.evalLogUser(testUser.username);
    //Clear shopping cart if needed
    const cartPage = await loggedPage.goCart();
    await cartPage.clearCart();

});
test('User can check out their shopping cart', async({page}) => {
    //User is already logged in at beforeEach
    //Test is hardcoded to test 2 items in cart
    const testuser = existUser();
    const item1 = initWBlueTop();
    const item2 = MTshirt();
    const card = testCard();
    const homePage = new HomePage(page);
    await homePage.goHome();
    //Browse to product page
    const prodPage = await homePage.goProduct();
    //Add item2 from product page
    await prodPage.add2Cart(2, 'continue');
    //Open item1 from product details page
    const detailsPage = await prodPage.goItemDetails(1);
    //Add item1 to cart with given quantity and view cart page
    const cartPage = await detailsPage.add2Cart('2', 'view');
    await cartPage?.evalCartInfo(item2, item1);
    const checkoutPage = await cartPage?.goCheckOut();
    //Verify address info & cart info
    await checkoutPage?.evalAddressInfo(testuser);
    await checkoutPage?.evalCartInfo(item2, item1);
    const paymentPage = await checkoutPage?.placeOrder();
    //Verify payment page element
    await paymentPage?.evalPaymentInfo();
    await paymentPage?.makePayment(card);
    //Verify payment done page
    await paymentPage?.evalPaid();
});