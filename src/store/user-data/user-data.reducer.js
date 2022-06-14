import { USER_DATA_ACTION_TYPES } from "./user-data.types";


export const USER_DATA_INITIAL_STATE = {
    userData: [],
}

export const userDataReducer = (state= USER_DATA_INITIAL_STATE, action = {}) => {
    const {type, payload} = action;

    switch(type) {
        case USER_DATA_ACTION_TYPES.SET_USER_DATA:
            return { ...state, userData: payload}
        default:
            return state;
    }

}