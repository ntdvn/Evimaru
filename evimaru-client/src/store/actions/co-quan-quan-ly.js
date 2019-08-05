import { CREATE_CO_QUAN_QUAN_LY, LOAD_CO_QUAN_QUAN_LY, UPDATE_CO_QUAN_QUAN_LY, REMOVE_CO_QUAN_QUAN_LY } from "../actionTypes";
import { apiCall } from "../../services/api";
import { addSuccess } from "./success";
import { addError } from "./errors";


export const load = cqqls => ({
    type: LOAD_CO_QUAN_QUAN_LY,
    cqqls
})

export const create = cqql => ({
    type: CREATE_CO_QUAN_QUAN_LY,
    cqql
})

export const update = (cqql_id, cqql) => ({
    type: UPDATE_CO_QUAN_QUAN_LY,
    cqql_id,
    cqql
})

export const remove = cqql_id => ({
    type: REMOVE_CO_QUAN_QUAN_LY,
    cqql_id
})

export const fetchCoQuanQuanLy = () => {
    return dispatch => {
        return apiCall("get", "/api/cqql")
        .then(res => {
            dispatch(load(res))
        })
        .catch(err => {
            dispatch(addError("Không thể load dữ liệu"))
        });
    }
}

export const postCoQuanQuanLy = (cqql) => {
    return dispatch => {
        return apiCall("post", "/api/cqql", cqql)
        .then(res => {
            dispatch(create(res));
            dispatch(addSuccess("Đã thêm thành công"));
            return true;
        })
        .catch(err => {
            dispatch(addError("Dữ liệu chưa chuẩn. Không thể tạo Cơ quan quản lý mới."));
            return false;
        })
    }
}

export const updateCoQuanQuanLy = (cqql_id, cqql) => {
    return dispatch => {
        return apiCall("put", `/api/cqql/${cqql_id}`, cqql)
        .then(res => {
            dispatch(update(cqql_id, res));
            dispatch(addSuccess("Đã sửa thành công"));
        })
        .catch(err => {
            dispatch(addError("Dữ liệu chưa chuẩn. Không thể sửa Cơ quan quản lý mới."));
        })
    }
}

export const removeCoQuanQuanLy = (cqql_id) => {
    return dispatch => {
        return apiCall("delete", `/api/cqql/${cqql_id}`)
        .then(res => {
            dispatch(addSuccess("Đã xóa thành công"));
            dispatch(remove(cqql_id))
        })
        .catch(err => dispatch(addError("Xóa cơ sở dữ liệu thất bại")))
    }
}
