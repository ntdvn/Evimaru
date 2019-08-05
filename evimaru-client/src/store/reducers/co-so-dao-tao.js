import { LOAD_CO_SO_DAO_TAO, CREATE_CO_SO_VAT_CHAT, CREATE_GIANG_VIEN } from "../actionTypes";

const coSoDaoTao =  (state = {}, action) => {
    switch(action.type) {
        case LOAD_CO_SO_DAO_TAO:
            return action.csdt;
        case CREATE_CO_SO_VAT_CHAT:
            return {...state, coSoVatChat: [...state.coSoVatChat, action.csvc]};
        // case CREATE_GIANG_VIEN:
        //     return {...state, coSoVatChat: [...state.giangVien, action.giangVien]};
        default:
            return state;
    }
}

export default coSoDaoTao;
