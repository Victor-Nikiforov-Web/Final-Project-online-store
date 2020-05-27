import { ActionType } from './action-type';

export interface Action {
    type: ActionType;
    payload?: any; 
}

