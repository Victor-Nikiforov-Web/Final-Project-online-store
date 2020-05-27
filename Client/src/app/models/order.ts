export class OrderModel {
    public constructor(
        public _id?:string ,
        public cartId?:string,
        public totalPrice?:number,
        public city?:string,
        public street?:string,
        public shippingDate?: Date,
        public orderDate?: Date ,
        public creditCard?:number
    ){}
}