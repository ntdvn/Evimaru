import {CREATE_USER_INFORMATION, LOAD_USER_INFORMATION} from "../actionTypes";

const userInformation = (state = {}, action) => {
    switch (action.type) {
        case CREATE_USER_INFORMATION:
            return {...action.userInformation}
        case LOAD_USER_INFORMATION:
            return {...action.userInformation}
        default:
            return state;
    }
}

export default userInformation;
