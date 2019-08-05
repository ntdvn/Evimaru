import React, { Component} from "react";
import { Input, Button, MDBDataTable, Modal, ModalHeader, ModalBody, ModalFooter, NavLink } from "mdbreact";
import { withRouter, Link } from "react-router-dom";
import { JSONisEmpty } from "../services/multifunctional";

class ManagerCoSoDaoTaoGiangVienAdd extends Component{
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
        .then(()=> {
            this.props.history.push("/user/manager/giangvien");
        })

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
        return (
            <div>
                <h3 className="my-3">Thông tin giảng viên</h3>
                <form onSubmit={this.handlePost}>
                    <div className="row">
                        <div className="col-md-6">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="input-hoten">Họ tên</span>
                                </div>
                                <input
                                    id="hoTen"
                                    type="text"
                                    class="form-control"
                                    placeholder="Họ tên"
                                    aria-label="Họ tên"
                                    aria-describedby="input-hoten"
                                    onChange={this.handlerInputChange}
                                    value={this.state.hoTen}
                                    required
                                 />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="input-ngaysinh">Ngày sinh</span>
                                </div>
                                <input
                                    id="ngaySinh"
                                    type="date"
                                    data-date-format="DD MMMM YYYY"
                                    data-date=""
                                    max="2005-01-01"
                                    className="form-control"
                                    aria-label="Ngày sinh"
                                    aria-describedby="input-ngaysinh"
                                    onChange={this.handlerInputChange}
                                    value={this.state.ngaySinh}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="input-hocvi">Học vị</span>
                                </div>
                                <input
                                    id="hocVi"
                                    type="text"
                                    class="form-control"
                                    placeholder="Học vị"
                                    aria-label="Học vị" aria-describedby="input-hocvi"
                                    onChange={this.handlerInputChange}
                                    value={this.state.hocVi}
                                    required
                                 />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="input-hocham">Học hàm</span>
                                </div>
                                <input
                                    id="hocHam"
                                    type="text"
                                    class="form-control"
                                    placeholder="Học hàm"
                                    aria-label="Học hàm"
                                    aria-describedby="input-hocham"
                                    onChange={this.handlerInputChange}
                                    value={this.state.hocHam}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="input-tienganh">Tiếng Anh</span>
                                </div>
                                <input
                                    id="tiengAnh"
                                    type="text"
                                    class="form-control"
                                    placeholder="Tiếng Anh"
                                    aria-label="Tiếng Anh"
                                    aria-describedby="input-tienganh"
                                    onChange={this.handlerInputChange}
                                    value={this.state.tiengAnh}
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="input-tinhoc">Tin học</span>
                                </div>
                                <input
                                    id="tinHoc"
                                    type="text"
                                    class="form-control"
                                    placeholder="Tin học"
                                    aria-label="Tin học"
                                    aria-describedby="input-tinhoc"
                                    onChange={this.handlerInputChange}
                                    value={this.state.tinHoc}
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-md-12 mb-3">
                            <div class="input-group">
                              <div class="input-group-prepend">
                                <span class="input-group-text">Chứng chỉ khác</span>
                              </div>
                              <textarea
                                  id="chungChiKhac"
                                  class="form-control"
                                  aria-label="Chứng chỉ khác"
                                  onChange={this.handlerInputChange}
                                  value={this.state.chungChiKhac}
                                  required>
                              </textarea>
                            </div>
                        </div>

                        <div className="col-md-12 mb-3">
                            <div class="input-group">
                              <div class="input-group-prepend">
                                <span class="input-group-text">Môn học đảm nhiệm</span>
                              </div>
                              <textarea
                                  id="monHoc"
                                  class="form-control"
                                  aria-label="Môn học đảm nhiệm"
                                  onChange={this.handlerInputChange}
                                  value={this.state.monHoc}
                                  required>
                              </textarea>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="input-email">Email</span>
                                </div>
                                <input
                                    id="email"
                                    type="text"
                                    class="form-control"
                                    placeholder="Email"
                                    aria-label="Email"
                                    aria-describedby="input-email"
                                    onChange={this.handlerInputChange}
                                    value={this.state.email}
                                    required
                                />
                            </div>
                            <h3 className="">Thông tin tài khoản</h3>
                        </div>
                        <div className="col-md-12">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="input-email">Email</span>
                                </div>
                                <input
                                    id="email"
                                    type="text"
                                    class="form-control"
                                    placeholder="Email"
                                    aria-label="Email"
                                    aria-describedby="input-email"
                                    onChange={this.handlerInputChange}
                                    value={this.state.email}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="input-username">Username</span>
                                </div>
                                <input
                                    id="username"
                                    type="text"
                                    class="form-control"
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="input-username"
                                    onChange={this.handlerInputChange}
                                    value={this.state.username}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="input-password">Password</span>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    class="form-control"
                                    placeholder="Password"
                                    aria-label="Password"
                                    aria-describedby="input-password"
                                    onChange={this.handlerInputChange}
                                    value={this.state.password}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <Button type="submit" className="btn btn-default m-0 mb-2">Thêm giảng viên</Button>
                </form>

            </div>
        )
    }
}

export default ManagerCoSoDaoTaoGiangVienAdd;
