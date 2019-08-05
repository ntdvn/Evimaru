import { LOAD_BAI_HOC } from "../actionTypes";

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_BAI_HOC:
            return action.baiHoc;
        default:
            return state;
    }
}
