import {test} from "@playwright/test";
import {HomePage} from "../pages/HomePage.ts";
import { newUser, existUser } from "../objects/User.ts";

test('Register new user', async({page}) => {
    //Initialize a testuser as newUser
    const testUser = newUser();
    const tp = new HomePage(page);
    await tp.goHome();
    await tp.evalNoUser();
    const loginPage = await tp.goLogin();
    const createUserPage = await loginPage.signUp(testUser);
    const createdHome = await createUserPage.createUser(testUser);
    await createdHome.evalLogUser(testUser.username);
    //Clean up created user for credential reuse
    await createdHome.deleteAcc();
});

test('Sign in to exsitisting user with correct credential', async({page}) =>
{
    //Initialize an exsiting user
    const testUser = existUser();
    const initPage = new HomePage(page);
    await initPage.goHome();
    await initPage.evalNoUser();
    const loginPage = await initPage.goLogin();
    const loggedPage = await loginPage.login(testUser);
    await loggedPage.evalLogUser(testUser.username);
});