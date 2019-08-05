import { LOAD_KHOA_HOC } from "../actionTypes"
import { apiCall } from "../../services/api";
import { addSuccess } from "./success";
import { addError } from "./errors";

export const loadKhoaHoc = khoaHocs => ({
    type: LOAD_KHOA_HOC,
    khoaHocs
})

export const fetchKhoaHoc = () => {
    return dispatch => {
        return apiCall("get", "/api/khoahoc")
        .then(res => dispatch(loadKhoaHoc(res)))
        .catch(err => dispatch(addError(err)))
    }
}
