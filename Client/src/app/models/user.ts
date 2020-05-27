export class UserModel {
    public constructor(
        public _id?:string,
        public id?: number,
        public email?: string,
        public firstName?: string,
        public lastName?: string,
        public password?: string,
        public city?: string,
        public street?: string,
        public isAdmin?: boolean
    ) { }
}