export const baseURL = 'https://automationexercise.com';
type url = 'home' | 'products' | 'cart' | 'login' | 'signup' |'delAcc' | 'created' | 'checkout' | 'payment';
export const urls: Record < url, string> = {
    home: baseURL,
    products: `${baseURL}/products`,
    cart: `${baseURL}/view_cart`,
    login: `${baseURL}/login`,
    signup: `${baseURL}/signup`,
    created: `${baseURL}/account_created`,
    delAcc: `${baseURL}/delete_account`,
    checkout: `${baseURL}/checkout`,
    payment: `${baseURL}/payment`
}
type partialurl = 'category' | 'brand' | 'details' | 'paid';
export const parturls: Record <partialurl, RegExp>= {
    category: /category_products/,
    brand: /brand_products/,
    details: /product_details/,
    paid: /payment_done/
}