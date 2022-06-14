import createAction from "../../utils/reducer/reducer.utils";
import { USER_DATA_ACTION_TYPES } from "./user-data.types";

export const setUserData = (userDataArray) => 
    createAction(USER_DATA_ACTION_TYPES.SET_USER_DATA, userDataArray)