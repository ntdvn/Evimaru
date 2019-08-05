import { LOAD_CO_QUAN_QUAN_LY, CREATE_CO_QUAN_QUAN_LY, UPDATE_CO_QUAN_QUAN_LY, REMOVE_CO_QUAN_QUAN_LY} from "../actionTypes";

const coQuanQuanLys =  (state = {}, action) => {
    switch(action.type) {
        case LOAD_CO_QUAN_QUAN_LY:
            return [...action.cqqls];
        case CREATE_CO_QUAN_QUAN_LY:
            return [...state, action.cqql];
        case UPDATE_CO_QUAN_QUAN_LY:
            return state.map(cqql => {
               if(cqql._id === action.cqql_id) return action.cqql
               else return cqql
            });
        case REMOVE_CO_QUAN_QUAN_LY:
            return state.filter(cqql => cqql._id !== action.cqql_id)
        default:
            return state;
    }
}

export default coQuanQuanLys;
