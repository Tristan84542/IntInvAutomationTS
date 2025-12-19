import { expect, Locator, Page } from "@playwright/test";
import { Card } from "../objects/Card";
import { parturls } from "../param/Urls";

export class PaymentPage{
    readonly page: Page;
    readonly nameOnCard: Locator;
    readonly cardNumber: Locator;
    readonly cvc: Locator;
    readonly expMonth: Locator;
    readonly expYear: Locator;
    readonly confirmOrderBtn: Locator;


    constructor(page : Page){
        this.page = page;
        this.nameOnCard = this.page.locator('input[data-qa="name-on-card"]');
        this.cardNumber = this.page.locator('input[data-qa="card-number"]');
        this.cvc = this.page.locator('input[data-qa="cvc"]');
        this.expMonth = this.page.locator('input[data-qa="expiry-month"]');
        this.expYear = this.page.locator('input[data-qa="expiry-year"]');
        this.confirmOrderBtn = this.page.locator('button[data-qa="pay-button"]');

    }

    async evalPaymentInfo(){
        await expect(this.page.getByText('Name on Card')).toBeVisible();
        await expect(this.page.getByText('Card Number')).toBeVisible();
        await expect(this.page.getByText('CVC')).toBeVisible();
        await expect(this.page.getByText('Expiration')).toBeVisible();

    }

    async makePayment(card: Card){
        await this.nameOnCard.fill(card.name);
        await this.cardNumber.fill(card.cardNum);
        await this.cvc.fill(card.cvc);
        await this.expMonth.fill(card.expMonth);
        await this.expYear.fill(card.expYear);
        await this.confirmOrderBtn.click();
        await expect(this.page).toHaveURL(parturls.paid);
    }
    async evalPaid(){
        await expect(this.page.getByText('Order Placed!')).toBeVisible();
        await expect(this.page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible()
        await expect(this.page.getByText('Download Invoice')).toBeVisible();
        await expect(this.page.getByText('Continue')).toBeVisible()
    }
}