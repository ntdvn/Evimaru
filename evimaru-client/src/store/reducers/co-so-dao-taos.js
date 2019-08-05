import { LOAD_CO_SO_DAO_TAOS, CREATE_CO_SO_DAO_TAO, UPDATE_CO_SO_DAO_TAO, REMOVE_CO_SO_DAO_TAO} from "../actionTypes";

const coSoDaoTaos =  (state = [], action) => {
    switch(action.type) {
        case LOAD_CO_SO_DAO_TAOS:
            // console.log(action);
            return [...action.csdts];
        case CREATE_CO_SO_DAO_TAO:
            return [...state, action.csdt];
        case UPDATE_CO_SO_DAO_TAO:
            return state.map(csdt => {
               if(csdt._id === action.csdt_id) return action.csdt;
               else return csdt
            });
        case REMOVE_CO_SO_DAO_TAO:
            return state.filter(csdt => csdt._id !== action.csdt_id)
        default:
            return state;
    }
}

export default coSoDaoTaos;
