import { UserModel } from '../models/user';
import { CartDetail } from '../models/cart-detail';

export class AppState {

    public user: UserModel;
    public productsOfCart: CartDetail[];
    public totalPrice: number;
    public userActive: boolean;
    public cartOption: boolean;

    public constructor() {
        this.user = null;
        this.productsOfCart = [];
        this.totalPrice = 0;
        this.userActive = false;
        this.cartOption = false;
    }
}
