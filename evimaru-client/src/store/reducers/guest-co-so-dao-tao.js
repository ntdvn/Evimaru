import { GUEST_LOAD_CO_SO_DAO_TAOS, GUEST_CURRENT_USER } from "../actionTypes";

const guest =  (state = {}, action) => {
    switch(action.type) {
        case GUEST_LOAD_CO_SO_DAO_TAOS:
            return {...state, coSoDaoTaos: action.csdts};
        case GUEST_CURRENT_USER:
            return {...state, currentUser: action.user};
        default:
            return state;
    }
}

export default guest;
