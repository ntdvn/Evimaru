import {
    LOAD_CO_SO_DAO_TAO, CREATE_CO_SO_VAT_CHAT, UPDATE_CO_SO_VAT_CHAT, DELETE_CO_SO_VAT_CHAT,
    CREATE_GIANG_VIEN, UPDATE_GIANG_VIEN, DELETE_GIANG_VIEN,
    CREATE_TAI_LIEU, UPDATE_TAI_LIEU, DELETE_TAI_LIEU,
    CREATE_OR_UPDATE_LIEN_HE,
    UPDATE_CHI_TIET_KHOA_HOC, ACTIVE_KHOA_HOC,
    ADD_BAI_HOC, UPDATE_BAI_HOC, REMOVE_BAI_HOC,
    ADD_BAI_KIEM_TRA, UPDATE_BAI_KIEM_TRA, REMOVE_BAI_KIEM_TRA,
    ADD_LOP_HOC, UPDATE_LOP_HOC, REMOVE_LOP_HOC,
    UPDATE_KHOA_HOC_DANG_KY
 } from "../actionTypes";
import { apiCall } from "../../services/api";
import { addSuccess } from "./success";
import { addError } from "./errors";

export const load = csdt => ({
    type: LOAD_CO_SO_DAO_TAO,
    csdt
})

export const createCoSoVatChat = csvc => ({
    type: CREATE_CO_SO_VAT_CHAT,
    csvc
})

export const updateCoSoVatChat = csdt => ({
    type: UPDATE_CO_SO_VAT_CHAT,
    csdt
})

export const deleteCoSoVatChat = csdt => ({
    type: DELETE_CO_SO_VAT_CHAT,
    csdt
})

export const createGiangVien = giangVien => ({
    type: CREATE_GIANG_VIEN,
    giangVien
})

export const createTaiLieu = taiLieu => ({
    type: CREATE_TAI_LIEU,
    taiLieu
})

export const createOrUpdateLienHe = lienHe => ({
    type: CREATE_OR_UPDATE_LIEN_HE,
    lienHe
})

export const updateChiTietKhoaHoc = khoaHoc => ({
    type: UPDATE_CHI_TIET_KHOA_HOC,
    khoaHoc
})

export const activeKhoaHoc = (khoaHocId, activeKey) => ({
    type: ACTIVE_KHOA_HOC,
    khoaHocId,
    activeKey
})

export const addBaiHoc = (khoaHocId, baiHoc) => ({
    type: ADD_BAI_HOC,
    khoaHocId,
    baiHoc
})

export const addBaiKiemTra = (khoaHocId, baiKiemTra) => ({
    type: ADD_BAI_KIEM_TRA,
    khoaHocId,
    baiKiemTra
})

export const addLopHoc = (khoaHocId, lopHoc) => ({
    type: ADD_LOP_HOC,
    khoaHocId,
    lopHoc
})

export const updateLopHoc = (khoaHocId, lopHoc) => ({
    type: UPDATE_LOP_HOC,
    khoaHocId,
    lopHoc
})

export const updateKhoaHocDangKy = (khoaHocDangKy) => ({
    type: UPDATE_KHOA_HOC_DANG_KY,
    khoaHocDangKy
})

export const fetchCoSoDaoTao = (csdt) => {
    console.log(csdt);
    return dispatch => {
        return apiCall("get", `/api/csdt/${csdt._id}`)
        .then(res => {
            dispatch(load(res))
            // dispatch(addSuccess("Load dữ liệu thành công"));
        })
        .catch(err => {
            dispatch(addError("Không thể load dữ liệu cơ sở đào tạo"))
        });
    }
}

export const postCoSoVatChat = (csdt_id, csvc) => {
    return dispatch => {
        return apiCall("post", `/api/csdt/${csdt_id}/csvc`, csvc)
        .then(res => {
            // console.log("hihi" + res);

            dispatch(createCoSoVatChat(res))
            dispatch(addSuccess("Thêm cơ sở vật chất thành công!"));
        })
        .catch(err => {
            console.log(err);
            dispatch(addError("Dữ liệu không đúng. Thêm cơ sở vật chất thất bại!"))
        });
    }
}

export const postGiangVien = (csdt_id, giangVien) => {
    return dispatch => {
        return apiCall("post", `/api/csdt/${csdt_id}/giangvien`, giangVien)
        .then(res => {
            console.log("hihi" + res);
            dispatch(createGiangVien(res));
            dispatch(addSuccess("Thêm giảng viên thành công!"));
        })
        .catch(err => {
            console.log(err);
            dispatch(addError("Dữ liệu không đúng hoặc lỗi không xác định!"));
        });
    }
}

export const postTaiLieu = (khoaHocCapPhepId, taiLieu) => {
    return dispatch => {
        return apiCall("post", `/api/khoahoccapphep/${khoaHocCapPhepId}/tailieu`, taiLieu)
        .then(res => {
            dispatch(createTaiLieu(res))
            dispatch(addSuccess("Thêm tài liệu thành công"));
        })
        .catch(err => {
            console.log(err);
            dispatch(addError(err))
        });
    }
}

export const postOrUpdateLienHe = (csdtId, lienHe) => {
    return dispatch => {
        return apiCall("post", `/api/csdt/${csdtId}/lienhe`, lienHe)
        .then(res => {
            dispatch(createOrUpdateLienHe(res))
            dispatch(addSuccess("Cập nhật liên hệ thành công"));
        })
        .catch(err => {
            console.log(err);
            dispatch(addError(err))
        });
    }
}


export const postChiTietKhoaHoc = (khoaHocId, chiTietKhoaHoc) => {
    // console.log(khoaHocId);
    // console.log(chiTietKhoaHoc);
    return dispatch => {
        return apiCall("post", `/api/khoahoccapphep/${khoaHocId}/chitiet`, chiTietKhoaHoc)
        .then(res => {
            // console.log("hihi" + res);
            dispatch(updateChiTietKhoaHoc(res))
            dispatch(addSuccess("Update chi tiết khóa học thành công"));
        })
        .catch(err => {
            console.log(err);
            dispatch(addError(err))
        });
    }
}

export const postActiveKhoaHoc = (khoaHocCapPhepId, activeKey) => {
    return dispatch => {
        return apiCall("post", `/api/khoahoccapphep/${khoaHocCapPhepId}/activecourse`, activeKey)
        .then(res => {
            dispatch(activeKhoaHoc(res))
            if(activeKey.activeKey)
                dispatch(addSuccess("Mở khóa học thành công"));
            else dispatch(addSuccess("Đóng khóa học thành công"));
        })
        .catch(err => {
            console.log(err);
            dispatch(addError(err))
        });
    }
}

export const postBaiHoc = (khoaHocCapPhepId, baiHoc) => {
    // console.log(khoaHocId);
    // console.log(baiHoc);
    return dispatch => {
        return apiCall("post", `/api/khoahoccapphep/${khoaHocCapPhepId}/baihoc`, baiHoc)
        .then(res => {
            // console.log("hihi" + res);
            dispatch(addBaiHoc(res))
            dispatch(addSuccess("Thêm bài học thành công"));
        })
        .catch(err => {
            console.log(err);
            dispatch(addError(err))
        });
    }
}

export const postBaiKiemTra = (khoaHocCapPhepId, baiKiemTra) => {
    // console.log(khoaHocId);
    // console.log(baiHoc);
    return dispatch => {
        return apiCall("post", `/api/khoahoccapphep/${khoaHocCapPhepId}/baikiemtra`, baiKiemTra)
        .then(res => {
            // console.log("hihi" + res);
            dispatch(addBaiHoc(res))
            dispatch(addSuccess("Thêm bài kiểm tra thành công"));
        })
        .catch(err => {
            console.log(err);
            dispatch(addError(err))
        });
    }
}

export const postLopHoc = (khoaHocCapPhepId, lopHoc) => {
    // console.log(khoaHocId);
    // console.log(baiHoc);
    return dispatch => {
        return apiCall("post", `/api/khoahoccapphep/${khoaHocCapPhepId}/lophoc`, lopHoc)
        .then(res => {
            // console.log("hihi" + res);
            dispatch(addBaiHoc(res))
            dispatch(addSuccess("Thêm lớp học thành công"));
        })
        .catch(err => {
            console.log(err);
            dispatch(addError(err))
        });
    }
}

export const postUpdateLopHoc = (lopHocId, lopHoc) => {
    // console.log(khoaHocId);
    // console.log(baiHoc);
    return dispatch => {
        return apiCall("put", `/api/lophoc/${lopHocId}`, lopHoc)
        .then(res => {
            // console.log("hihi" + res);
            dispatch(updateLopHoc(res))
            dispatch(addSuccess("Sửa khóa học thành công"));
        })
        .catch(err => {
            console.log(err);
            dispatch(addError(err))
        });
    }
}

export const postUpdateKhoaHocDangKy = (khoaHocDangKyId, khoaHocDangKy) => {
    // console.log(khoaHocId);
    // console.log(baiHoc);
    return dispatch => {
        return apiCall("put", `/api/khoahocdangky/${khoaHocDangKyId}`, khoaHocDangKy)
        .then(res => {
            // console.log("hihi" + res);
            dispatch(updateKhoaHocDangKy(res))
            dispatch(addSuccess("Sửa thành công"));
        })
        .catch(err => {
            console.log(err);
            dispatch(addError(err))
        });
    }
}
