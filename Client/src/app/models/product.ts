export class ProductModel {
    public constructor(
        public _id?:string,
        public name?:string,
        public categoryId?:string,
        public price?:number,
        public img?:string | File
    ){}
}