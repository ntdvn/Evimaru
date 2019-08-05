import { LOAD_BAI_KIEM_TRA} from "../actionTypes";

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_BAI_KIEM_TRA:
            return action.baiKiemTra;
        default:
            return state;
    }
}
