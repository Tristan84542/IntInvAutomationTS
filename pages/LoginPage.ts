import { Locator, Page, expect } from "@playwright/test";
import { User } from "../objects/User.ts";
import { HomePage } from "./HomePage.ts"
import { SignupPage } from "./SignupPage.ts"
import { urls } from "../param/Urls.ts";

export class LoginPage{
    readonly page: Page;
    readonly loginEmail: Locator;
    readonly password: Locator;
    readonly loginBtn: Locator;
    readonly signupName: Locator;
    readonly signupEmail: Locator;
    readonly signupBtn: Locator;

    constructor( page: Page){
        this.page = page;
        this.loginEmail = page.locator('input[data-qa="login-email"]');
        this.password = page.locator('input[data-qa="login-password"]');
        this.loginBtn = page.locator('button[data-qa="login-button"]');
        this.signupName = page.locator('input[data-qa="signup-name"]');
        this.signupEmail = page.locator('input[data-qa="signup-email"]');
        this.signupBtn = page.locator('button[data-qa="signup-button"]');

    }
    async login(user: User): Promise<HomePage> {
        await this.loginEmail.fill(user.email);
        await this.password.fill(user.password);
        await this.loginBtn.click();
        await expect(this.page).toHaveURL(urls.home);
        
        return new HomePage(this.page);
    }

    async signUp(newUser: User): Promise<SignupPage>{
        await this.signupEmail.fill(newUser.email);
        await this.signupName.fill(newUser.username);
        await this.signupBtn.click();
        await expect(this.page).toHaveURL(urls.signup);
        return new SignupPage(this.page);
    }
}