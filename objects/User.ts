export class User{
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address1: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    phone: string;

    constructor(username: string, email: string,
    password: string, 
    firstName: string, lastName: string,
    address1: string, country: string, state: string, city: string, zipcode: string,
    phone: string)
    {
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address1 = address1;
        this.country = country;
        this.state = state;
        this.city = city;
        this.zipcode = zipcode;
        this.phone = phone;
    }
}
//Existing user info username "ii test user" / email "user@iitest.com" / password "123456"
export function newUser(){
    const username = "ii test new user";
    const email = "newuser@iitest.com";
    const password = "1234abcd";
    const firstName = "test";
    const lastName = "user";
    const address1 = "test address 1";
    const country = "Canada";
    const state = "test state";
    const city = "test city";
    const zipcode = "54321";
    const phone = "1233211234";
    return new User(username, email, password, firstName, lastName, address1, country, state, city, zipcode, phone);
}
export function existUser(){
    return new User("ii test user", "user@iitest.com", "123456", ". test", "user ii", "test street", "Canada", "abcde", "abcde", "123456", "123456")
}