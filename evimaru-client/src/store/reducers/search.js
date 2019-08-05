import { SEARCH_USER_BY_NAME, SEARCH_KHOA_HOC_BY_NAME } from "../actionTypes";

export default (state = {}, action) => {
    switch (action.type) {
        case SEARCH_USER_BY_NAME:
            return {...state, user: action.result};
        case SEARCH_KHOA_HOC_BY_NAME:
            return {...state, khoaHoc: action.result};
        default:
            return state;
    }
}
