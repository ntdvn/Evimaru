import { LOAD_BAI_KIEM_TRA } from "../actionTypes";
import { apiCall } from "../../services/api";
import { addSuccess } from "./success";
import { addError } from "./errors";

export const load = baiKiemTra => ({
    type: LOAD_BAI_KIEM_TRA,
    baiKiemTra
})

export const fetchBaiKiemTra = (baiKiemTra_id) => {
    return dispatch => {
        return apiCall("get", `/api/baikiemtra/${baiKiemTra_id}`)
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
