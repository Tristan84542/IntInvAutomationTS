export class Card{
    name: string;
    cardNum: string;
    cvc: string;
    expMonth: string;
    expYear: string;

    constructor(name: string, cardNum: string, cvc: string, expMonth: string, expYear: string){
        this.name = name;
        this.cardNum = cardNum;
        this.cvc = cvc;
        this.expMonth = expMonth;
        this.expYear = expYear;
    }
}

export function testCard(){
    const name = 'test user';
    const cardNum = '1234234534564567';
    const cvc = '999';
    const month = '11';
    const year = '2099';
    return new Card(name, cardNum, cvc, month, year);
}