import { CREATE_NHOM_KHOA_HOC, LOAD_NHOM_KHOA_HOC,
    UPDATE_NHOM_KHOA_HOC, REMOVE_NHOM_KHOA_HOC,
    CREATE_KHOA_HOC, UPDATE_KHOA_HOC, REMOVE_KHOA_HOC } from "../actionTypes"
import { apiCall } from "../../services/api";
import { addSuccess } from "./success";
import { addError } from "./errors";

export const loadNhomKhoaHoc = nhomKhoaHocs => ({
    type: LOAD_NHOM_KHOA_HOC,
    nhomKhoaHocs
})

export const createNhomKhoaHoc = nhomKhoaHoc => ({
    type: CREATE_NHOM_KHOA_HOC,
    nhomKhoaHoc
})

export const createKhoaHoc = (khoaHoc, tenNhomKhoaHoc) => ({
    type: CREATE_KHOA_HOC,
    khoaHoc
})



export const fetchNhomKhoaHoc = () => {
    return dispatch => {
        return apiCall("get", "/api/nhomkhoahoc")
        .then(res => dispatch(loadNhomKhoaHoc(res)))
        .catch(err => dispatch(addError(err)))
    }
}

export const postNhomKhoaHoc = (nhomKhoaHoc) => {
    return dispatch => {
        return apiCall("post", "/api/nhomkhoahoc", nhomKhoaHoc)
        .then(res => {
            console.log(res);
            dispatch(createNhomKhoaHoc(res))
            dispatch(addSuccess("Tạo nhóm khóa học thành công"))
        })
        .catch(err => {
            dispatch(addError(err))
        })
    }
}

export const postKhoaHoc = (khoaHoc) => {
    return dispatch => {
        return apiCall("post", "/api/khoahoc", khoaHoc)
        .then(res => {
            dispatch(addSuccess("Tạo khóa học thành công"))
            dispatch(createKhoaHoc(res))
        })
        .catch(err => dispatch(addError(err)))
    }
}
