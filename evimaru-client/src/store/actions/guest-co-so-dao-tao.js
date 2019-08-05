import { GUEST_LOAD_CO_SO_DAO_TAOS, GUEST_CURRENT_USER, DANG_KY_HOC,
        PASS_KHOA_HOC} from "../actionTypes";
import { apiCall } from "../../services/api";
import { setCurrentUser } from "./auth";
import { addError } from "./errors";
import { addSuccess } from "./success";


export const loadCoSoDaoTaos = csdts => ({
    type: GUEST_LOAD_CO_SO_DAO_TAOS,
    csdts
})

export const loadCurrentUser = user => ({
    type: GUEST_CURRENT_USER,
    user
})

export const dangKyHoc = (lopHoc) => ({
    type: DANG_KY_HOC,
    lopHoc
})

export const passKhoaHoc = (userId, baiHocId) => ({
    type: PASS_KHOA_HOC,
    userId,
    baiHocId
})

export const fetchGuestCoSoDaoTaos = () => {
    return dispatch => {
        return apiCall("get", "/api/csdt")
        .then(res => {
            dispatch(loadCoSoDaoTaos(res))
            // dispatch(addSuccess("Load dữ liệu thành công"));
        })
        .catch(err => {
            dispatch(addError("Không thể load dữ liệu"))
            // dispatch(addSuccess("Đã thêm thành công"));
        });
    }
}

export const fetchCurrentUser = userId => {
    // console.log(userId);
    return dispatch => {
        return apiCall("get", `/api/users/${userId}`)
        .then(res => {
            // console.log(res);
            dispatch(loadCurrentUser(res))
            // dispatch(addSuccess("Load dữ liệu thành công"));
        })
        .catch(err => {
            dispatch(addError("Không thể load dữ liệu"))
            // dispatch(addSuccess("Đã thêm thành công"));
        });
    }
}

export const postDangKyKhoaHoc = ( userId, khoaHocCapPhepId, lopHocId, registerKey) => {
    // console.log(khoaHocId);
    // console.log(baiHoc);
    return dispatch => {
        return apiCall("post", `/api/dangky/user/${userId}/dangky/khoahoc/${khoaHocCapPhepId}/lophoc/${lopHocId}`, registerKey)

        .then(res => {
            // dispatch(dangKyHoc(res))
            // console.log(res);
            dispatch(addSuccess(res));
        })
        .catch(err => {
            console.log(err);
            dispatch(addError(err.message))
        });
    }
}

export const postPassKhoaHoc = ( userId, khoaHocCapPhepId, baiKiemTraId, data) => {
    return dispatch => {
        return apiCall("post", `/api/users/${userId}/pass/khoahoccapphep/${khoaHocCapPhepId}/baikiemtra/${baiKiemTraId}`, data)
        .then(res => {
            // dispatch(dangKyHoc(res))
            // console.log(res);
            dispatch(addSuccess(res));
        })
        .catch(err => {
            // console.log(err);
            dispatch(addError(err.message))
        });
    }
}

// export const postPassKhoaHocBaiKiemTra = ( userId, khoaHocCapPhepId, baiKiemTraId, data) => {
//     // console.log(khoaHocId);
//     // console.log(baiHoc);
//     return dispatch => {
//         return apiCall("post", `/api/users/${userId}/pass/khoahoccapphep/${khoaHocCapPhepId}/baikiemtra/${baiKiemTraId}`, {})
//         .then(res => {
//             // dispatch(dangKyHoc(res))
//             // console.log(res);
//             dispatch(addSuccess(res));
//         })
//         .catch(err => {
//             // console.log(err);
//             dispatch(addError(err.message))
//         });
//     }
// }
