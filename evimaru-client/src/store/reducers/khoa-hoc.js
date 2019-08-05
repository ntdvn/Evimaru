import { LOAD_KHOA_HOC } from "../actionTypes";

const khoaHocs =  (state = {}, action) => {
    switch(action.type) {
        case LOAD_KHOA_HOC:
            return [...action.khoaHocs];
        default:
            return state;
    }
}

export default khoaHocs;
