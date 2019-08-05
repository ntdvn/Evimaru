import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import { connect } from "react-redux";
import ManagerAmin from "../containers/ManagerAmin";
import ManagerCoQuanQuanLy from "../containers/ManagerCoQuanQuanLy";
import ManagerCoSoDaoTao from "../containers/ManagerCoSoDaoTao";
import ManagerHocVien from "../containers/ManagerHocVien";
import { fetchCoQuanQuanLy, postCoQuanQuanLy, updateCoQuanQuanLy, removeCoQuanQuanLy } from "../store/actions/co-quan-quan-ly";
import { fetchCoSoDaoTaos, postCoSoDaoTao, updateCoSoDaoTao, removeCoSoDaoTao } from "../store/actions/co-so-dao-taos";
import { fetchNhomKhoaHoc, postNhomKhoaHoc, postKhoaHoc } from "../store/actions/nhom-khoa-hoc";
import { capPhepKhoaHoc } from "../store/actions/cap-phep-khoa-hoc";
import { fetchCoSoDaoTao, postCoSoVatChat, postGiangVien, postTaiLieu, postOrUpdateLienHe , postChiTietKhoaHoc, postActiveKhoaHoc,
postBaiHoc, postBaiKiemTra, postLopHoc, postUpdateLopHoc, postUpdateKhoaHocDangKy } from "../store/actions/co-so-dao-tao";
import { fetchGuestCoSoDaoTaos, fetchCurrentUser, postDangKyKhoaHoc } from "../store/actions/guest-co-so-dao-tao";



class ManagerUser extends Component {
    componentDidMount(){
        switch (this.props.currentUser.user.role.code) {
            case 1:
                this.props.fetchNhomKhoaHoc();
                this.props.fetchCoSoDaoTaos();
                break;
            case 2:
                this.props.fetchCoSoDaoTao(this.props.currentUser.user.coSoDaoTao);
                break;
            case 3:

                break;
            case 4:
                this.props.fetchGuestCoSoDaoTaos();
                this.props.fetchCurrentUser(this.props.currentUser.user.id)
                break;
            case 5:
                this.props.fetchCoQuanQuanLy();
                break;
            default:
        }
    }
    render() {
        const { currentUser } = this.props;
        switch (currentUser.user.role.code) {
            case 1:
                return (
                    <ManagerCoQuanQuanLy
                        {...this.props}
                    />
                )
                break;
            case 2:
                return (
                    <ManagerCoSoDaoTao
                        {...this.props}
                    />
                )
                break;
            case 3:
                return (
                    <div>hehe</div>
                )
                break;
            case 4:
                return (
                    <ManagerHocVien
                        {...this.props}
                    />
                )
                break;
            case 5:
                return (
                    <ManagerAmin
                        {...this.props}
                    />
                )
                break;
            default:
        }
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        coQuanQuanLys: state.coQuanQuanLys,
        coSoDaoTaos: state.coSoDaoTaos,
        nhomKhoaHocs: state.nhomKhoaHocs,
        coSoDaoTao: state.coSoDaoTao,
        success: state.success,
        errors: state.errors,
        guest: state.guest
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        {
            fetchGuestCoSoDaoTaos,
            fetchCurrentUser,
            fetchCoQuanQuanLy,
            postCoQuanQuanLy,
            updateCoQuanQuanLy,
            removeCoQuanQuanLy,
            fetchCoSoDaoTaos,
            postCoSoDaoTao,
            updateCoSoDaoTao,
            removeCoSoDaoTao,
            fetchNhomKhoaHoc,
            postNhomKhoaHoc,
            postKhoaHoc,
            postChiTietKhoaHoc,
            postActiveKhoaHoc,
            postBaiHoc,
            postBaiKiemTra,
            postLopHoc,
            postUpdateLopHoc,
            capPhepKhoaHoc,
            fetchCoSoDaoTao,
            postCoSoVatChat,
            postGiangVien,
            postTaiLieu,
            postOrUpdateLienHe,
            postUpdateKhoaHocDangKy

        }
    )
    (ManagerUser)
);
