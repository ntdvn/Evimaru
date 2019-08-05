import { SEARCH_USER_BY_NAME, SEARCH_KHOA_HOC_BY_NAME } from "../actionTypes";
import { apiCall } from "../../services/api";
import { addSuccess } from "./success";
import { addError } from "./errors";

export const searchUserByName = result => ({
    type: SEARCH_USER_BY_NAME,
    result
})

export const searchKhoaHocByName = result => ({
    type: SEARCH_KHOA_HOC_BY_NAME,
    result
})

export const fetchSearchUserByName = (searchData) => {
    return dispatch => {
        return apiCall("post", `/api/search/user/byname`, searchData)
        .then(res => {
            // console.log(res);
            dispatch(searchUserByName(res))
            // dispatch(addSuccess("Load dữ liệu thành công"));
        })
        .catch(err => {
            dispatch(addError("Không thể load dữ liệu"))
        });
    }
}

export const fetchSearchKhoaHocByName = (searchData) => {
    return dispatch => {
        return apiCall("post", `/api/search/khoahoc/byname`, searchData)
        .then(res => {
            // console.log(res);
            dispatch(searchKhoaHocByName(res))
            // dispatch(addSuccess("Load dữ liệu thành công"));
        })
        .catch(err => {
            dispatch(addError("Không thể load dữ liệu"))
        });
    }
}
