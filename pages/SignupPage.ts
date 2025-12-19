import {Locator, Page, expect} from "@playwright/test";
import {User} from "../objects/User.ts";
import {HomePage} from "./HomePage.ts";
import {urls} from "../param/Urls.ts";

export class SignupPage {
    readonly page: Page;
    readonly titleLoc: Locator;
    readonly usernameLoc: Locator;
    readonly emailLoc: Locator;
    readonly passwordLoc: Locator;
    readonly firstnameLoc: Locator;
    readonly lastnameLoc: Locator;
    readonly address1Loc: Locator;
    readonly countryLoc: Locator;
    readonly stateLoc: Locator;
    readonly cityLoc: Locator;
    readonly zipcodeLoc: Locator
    readonly mobileLoc: Locator;
    readonly createBtn: Locator;
    readonly continueBtn: Locator;


    constructor(page: Page){
        this.page = page;
        this.titleLoc = page.getByText("Enter Account Information");
        this.usernameLoc = page.locator('#name');
        this.emailLoc = page.locator('#email');
        this.passwordLoc = page.locator('#password');
        this.firstnameLoc = page.locator('#first_name');
        this.lastnameLoc = page.locator('#last_name');
        this.address1Loc = page.locator('#address1');
        this.countryLoc = page.locator('#country');
        this.stateLoc = page.locator('#state');
        this.cityLoc = page.locator('#city')
        this.zipcodeLoc = page.locator('#zipcode');
        this.mobileLoc = page.locator('#mobile_number');
        this.createBtn = page.locator('button[data-qa="create-account"]');
        this.continueBtn = page.locator('a[data-qa="continue-button"]');
    }

    async createUser(newUser: User): Promise<HomePage>{
        //Assert data form is visible by checking first title
        await expect(this.titleLoc).toBeVisible();
        //Assert username & email are prefilled
        const usernameAttr = await this.usernameLoc.getAttribute('value');
        expect(usernameAttr).toEqual(newUser.username);
        const emailattr = await this.emailLoc.getAttribute('value');
        expect(emailattr).toEqual(newUser.email);

        //Fill all the rest required informations;
        await this.passwordLoc.fill(newUser.password);
        await this.firstnameLoc.fill(newUser.firstName);
        await this.lastnameLoc.fill(newUser.lastName);
        await this.address1Loc.fill(newUser.address1);
        await this.countryLoc.selectOption(newUser.country);
        await this.stateLoc.fill(newUser.state);
        await this.cityLoc.fill(newUser.city);
        await this.zipcodeLoc.fill(newUser.zipcode);
        await this.mobileLoc.fill(newUser.phone);

        //Click create button
        await this.createBtn.click();
        await expect(this.page).toHaveURL(urls.created);
        await expect(this.page.getByText('Account Created!')).toBeVisible();
        await this.continueBtn.click();
        //Will redirect to home page
        return new HomePage(this.page);
    }
}