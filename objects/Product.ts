export class Product{
    itemDesc: string;
    itemCat: string;
    itemPrice: string;
    itemAvail: string;
    itemCondition: string;
    itemBrand: string;

    constructor(itemDesc: string, itemCat: string, 
        itemPrice: string, itemAvail: string, itemCondition: string,
        itemBrand: string){
            this.itemDesc = itemDesc;
            this.itemCat = itemCat;
            this.itemPrice = itemPrice;
            this.itemAvail = itemAvail;
            this.itemCondition = itemCondition;
            this.itemBrand = itemBrand;
        }

}

export function initWBlueTop(){
    const desc = 'Blue Top';
    const cat = 'Women > Tops';
    const price = 'Rs. 500';
    const avail = 'In Stock';
    const cond = 'New';
    const brand = 'Polo';
    return new Product(desc, cat, price, avail, cond, brand);
}
export function MTshirt(){
    const desc = 'Men Tshirt';
    const cat = 'Men > Tshirts';
    const price = 'Rs. 400';
    const avail = 'In Stock';
    const cond = 'New';
    const brand = 'H&M';
    return new Product(desc, cat, price, avail, cond, brand);
}