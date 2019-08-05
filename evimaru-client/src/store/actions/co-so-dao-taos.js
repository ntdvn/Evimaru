import { CREATE_CO_SO_DAO_TAO, LOAD_CO_SO_DAO_TAOS, UPDATE_CO_SO_DAO_TAO, REMOVE_CO_SO_DAO_TAO } from "../actionTypes";
import { apiCall } from "../../services/api";
import { addSuccess } from "./success";
import { addError } from "./errors";


export const load = csdts => ({
    type: LOAD_CO_SO_DAO_TAOS,
    csdts
})

export const create = csdt => ({
    type: CREATE_CO_SO_DAO_TAO,
    csdt
})

export const update = (csdt_id, csdt) => ({
    type: UPDATE_CO_SO_DAO_TAO,
    csdt_id,
    csdt
})

export const remove = csdt_id => ({
    type: REMOVE_CO_SO_DAO_TAO,
    csdt_id
})

// export const fetchCoSoDaoTaos = () => {
//     return dispatch => {
//         return apiCall("get", "/api/csdt")
//         .then(res => dispatch(loadCoSoDaoTaos(res)))
//         .catch(err => dispatch(addError(err)))
//     }
// }

export const fetchCoSoDaoTaos = () => {
    return dispatch => {
        return apiCall("get", "/api/csdt")
        .then(res => {
            dispatch(load(res))
        })
        .catch(err => {
            dispatch(addError("Không thể load dữ liệu"))
        });
    }
}


export const postCoSoDaoTao = (csdt) => {
    return dispatch => {
        return apiCall("post", "/api/csdt", csdt)
        .then(res => {
            dispatch(create(res));
            dispatch(addSuccess("Đã thêm thành công"));
        })
        .catch(err => {
            dispatch(addError("Dữ liệu chưa chuẩn. Không thể tạo Cơ sở đào tạo mới."));
        })
    }
}

export const updateCoSoDaoTao = (csdt_id, csdt) => {
    return dispatch => {
        return apiCall("put", `/api/csdt/${csdt_id}`, csdt)
        .then(res => {
            dispatch(update(csdt_id, res));
            dispatch(addSuccess("Đã sửa thành công"));
        })
        .catch(err => {
            dispatch(addError("Dữ liệu chưa chuẩn. Không thể sửa Cơ sở đào tạo mới."));
        })
    }
}

export const removeCoSoDaoTao = (csdt_id) => {
    return dispatch => {
        return apiCall("delete", `/api/csdt/${csdt_id}`)
        .then(res => {
            dispatch(addSuccess("Đã xóa thành công"));
            dispatch(remove(csdt_id))
        })
        .catch(err => dispatch(addError("Xóa cơ sở đào tạo thất bại")))
    }
}
