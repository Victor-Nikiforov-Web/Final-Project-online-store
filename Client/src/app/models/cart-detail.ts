export class CartDetail {
    public constructor(
        public _id?: string,
        public cartId?: string,
        public productId?: string,
        public amount?: number,
        public price?: number,
        public name?:string
    ) { }
}