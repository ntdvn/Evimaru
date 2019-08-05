import { LOAD_BAI_HOC } from "../actionTypes";
import { apiCall } from "../../services/api";
import { addSuccess } from "./success";
import { addError } from "./errors";

export const load = baiHoc => ({
    type: LOAD_BAI_HOC,
    baiHoc
})

export const fetchBaiHoc = (baiHoc_id) => {
    return dispatch => {
        return apiCall("get", `/api/baihoc/${baiHoc_id}`)
        .then(res => {
            // console.log(res);
            dispatch(load(res))
            // dispatch(addSuccess("Load dữ liệu thành công"));
        })
        .catch(err => {
            dispatch(addError("Không thể load dữ liệu"))
        });
    }
}
