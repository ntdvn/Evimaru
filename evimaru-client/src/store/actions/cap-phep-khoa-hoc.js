import { apiCall } from "../../services/api";
import { addSuccess } from "./success";
import { addError } from "./errors";

export const capPhepKhoaHoc = (khoaHocId, capPhep) => {
    // console.log(khoaHocId);
    // console.log(capPhep);
    return dispatch => {
        // console.log(khoaHocId);
        // console.log(dispatch);
        return apiCall("post", `/api/capphep/${khoaHocId}`, capPhep)
        .then(res => {
            // console.log(res);
            dispatch(addSuccess("Cấp phép thành công"))
        })
        .catch(err => {
            console.log(err);
            dispatch(addError(err))
        })
    }
}
