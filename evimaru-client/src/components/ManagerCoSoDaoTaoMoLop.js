import React, { Component} from "react";
import { Input, Button, MDBDataTable, Modal, ModalHeader, ModalBody, ModalFooter, NavLink } from "mdbreact";
import { withRouter, Link } from "react-router-dom";
import { JSONisEmpty } from "../services/multifunctional";

class ManagerCoSoDaoTaoMoLop extends Component{
    constructor(props){
        super(props);
        this.state = {
            hoTen: "",
            ngaySinh: "",
            hocVi: "",
            hocHam: "",
            tiengAnh: "",
            tinHoc: "",
            chungChiKhac: "",
            monHoc: "",
            email: "",
            username: "",
            password: ""
        }
    }

    handlerInputChange = e => {
        this.setState({[e.target.id]: e.target.value})
    }
    handlePost = e => {
        e.preventDefault();
        this.props.postGiangVien(this.props.coSoDaoTao._id,
            {
            ...this.state
            }
        )
        this.props.history.push("/user/manager/giangvien/");
    }
    // handleUpdate = (id, csdt) => {
    //     this.props.updateCoSoDaoTao(id, csdt)
    // }
    //
    // handlerRemove = (id) => {
    //     this.props.removeCoSoDaoTao(id)
    // }
    componentDidMount(){

    }

    render() {
        const { coSoDaoTao, match } = this.props;
        var nhomKhoaHoc, khoaHoc, giangViens;
        if(!JSONisEmpty(coSoDaoTao)){
            if(coSoDaoTao.hasOwnProperty('danhSachGiangVien')){
                if(coSoDaoTao.danhSachGiangVien.hasOwnProperty('giangVien')){
                    nhomKhoaHoc = coSoDaoTao.nhomKhoaHoc.find(nhomKhoaHoc => nhomKhoaHoc._id == match.params.nhomKhoaHocId);
                    khoaHoc = nhomKhoaHoc.khoaHoc.find(khoaHoc => khoaHoc._id == match.params.khoaHocId);
                    var titlte = <h3 className="my-3">Mở lớp: {khoaHoc.name}</h3>
                    giangViens = coSoDaoTao.danhSachGiangVien.giangVien.map((giangVien, i) => {
                        var ngaySinh = new Date(giangVien.userInformation.ngaySinh);
                        return {
                            id: giangVien._id,
                            chungChi: giangVien.userInformation.chungChi,
                            hoTen: giangVien.userInformation.hoTen,
                            hocHam: giangVien.userInformation.hocHam,
                            hocVi: giangVien.userInformation.hocVi,
                            monHoc: giangVien.userInformation.monHoc,
                            ngaySinh: ngaySinh.toLocaleDateString('en-GB'),
                            tiengAnh: giangVien.userInformation.tiengAnh,
                            tinHoc: giangVien.userInformation.tinHoc,
                            imageUrl: ""
                        }
                    })
                    var listCheckBoxGiangVien = giangViens.map((giangVien, i) => {
                        return (
                            <div>
                                <div className="custom-control custom-checkbox" key={giangVien._id}>
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id={`coSoDaoTao+${i}`}
                                        value={giangVien._id}
                                        onChange={this.handlerListCheck}
                                    />
                                <label className="custom-control-label" htmlFor={`coSoDaoTao+${i}`}>{`${giangVien.hoTen} - (${giangVien.ngaySinh})`}</label>
                                </div>
                            </div>
                        )
                    })
                }
            }
        }
        return (
            <div>
                {titlte}
                <form onSubmit={this.handlePost}>
                    <div className="row">
                        <div className="col-md-6">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="input-malop">Mã lớp</span>
                                </div>
                                <input
                                    id="ma"
                                    type="text"
                                    class="form-control"
                                    placeholder="Mã lớp"
                                    aria-label="Mã lớp"
                                    aria-describedby="input-malop"
                                    onChange={this.handlerInputChange}
                                    value={this.state.ma}
                                    required
                                 />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="input-tenlop">Tên lớp</span>
                                </div>
                                <input
                                    id="ten"
                                    type="text"
                                    class="form-control"
                                    placeholder="Tên lớp"
                                    aria-label="Tên lớp"
                                    aria-describedby="input-tenlop"
                                    onChange={this.handlerInputChange}
                                    value={this.state.ten}
                                    required
                                 />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="input-ngayBatDau">Ngày bắt đầu</span>
                                </div>
                                <input
                                    id="ngayBatDau"
                                    type="date"
                                    data-date-format="DD MMMM YYYY"
                                    data-date=""
                                    min="2010-01-01"
                                    max="2030-01-01"
                                    className="form-control"
                                    aria-label="Ngày bắt đầu"
                                    aria-describedby="input-ngayBatDau"
                                    onChange={this.handlerInputChange}
                                    value={this.state.ngayBatDau}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="input-ngayketthuc">Ngày kết thúc</span>
                                </div>
                                <input
                                    id="ngayKetThuc"
                                    type="date"
                                    data-date-format="DD MMMM YYYY"
                                    data-date=""
                                    min="2010-01-01"
                                    max="2030-01-01"
                                    className="form-control"
                                    aria-label="Ngày kết thúc"
                                    aria-describedby="input-ngayketthuc"
                                    onChange={this.handlerInputChange}
                                    value={this.state.ngayKetThuc}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="input-soquyetdinh">Số quyết định</span>
                                </div>
                                <input
                                    id="soQuyetDinh"
                                    type="text"
                                    class="form-control"
                                    placeholder="Số quyết định"
                                    aria-label="Số quyết định"
                                    aria-describedby="input-hocvi"
                                    onChange={this.handlerInputChange}
                                    value={this.state.soQuyetDinh}
                                    required
                                 />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="input-tinhtrang">Tình trạng</span>
                                </div>
                                <input
                                    id="tinhTrang"
                                    type="text"
                                    class="form-control"
                                    placeholder="Tình trạng"
                                    aria-label="Tình trạng"
                                    aria-describedby="input-tinhtrang"
                                    onChange={this.handlerInputChange}
                                    value={this.state.tinhTrang}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <h5>Chọn giảng viên</h5>
                            { listCheckBoxGiangVien }
                        </div>

                    </div>

                    <Button type="submit" className="btn btn-default m-0 mb-2 mt-2">Mở lớp</Button>
                </form>

            </div>
        )
    }
}

export default withRouter(ManagerCoSoDaoTaoMoLop);
