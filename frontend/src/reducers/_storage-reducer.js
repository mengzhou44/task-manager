
import uuid from 'uuid/v1';

import * as types from '../actions/types';

const INITIAL_STATE = {

    deviceId: uuid()
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SET_ITEM:
            let temp1 = { ...state };
            temp1[action.payload.key] = action.payload.value;
            return temp1;

        case types.REMOVE_ITEM:
            let temp2 = { ...state };
            delete temp2[action.payload];
            return temp2;

        default:
            return state;
    }
}