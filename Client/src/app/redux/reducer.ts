import { AppState } from './app-state';
import { Action } from './action';
import { ActionType } from './action-type';

export function reducer(oldAppState: AppState, action: Action): AppState {

    const newAppState = { ...oldAppState };

    switch (action.type) {

        case ActionType.userLogin:
            newAppState.user = action.payload;
            break;

        case ActionType.getAllProductsOfCart:
            newAppState.productsOfCart = action.payload;
            break;

        case ActionType.addProductToCart:
            newAppState.productsOfCart.push(action.payload);
            break;

        case ActionType.removeFromCart:
            const indexToDelete = newAppState.productsOfCart.findIndex(p => p._id === action.payload);
            newAppState.productsOfCart.splice(indexToDelete, 1);
            break;

        case ActionType.updateProduct:
            const index = newAppState.productsOfCart.findIndex(p => p._id === action.payload._id);
            newAppState.productsOfCart[index] = action.payload;
            break;

        case ActionType.updateTotalPrice:
            newAppState.totalPrice = action.payload;
            break;

        case ActionType.updateUserActive:
            newAppState.userActive = action.payload;
            break;

        case ActionType.updateCartOption:
            newAppState.cartOption = action.payload;
            break;
    }
    return newAppState;
}