import React, { Component} from "react";
import { Input, Button, MDBDataTable, Modal, ModalHeader, ModalBody, ModalFooter, NavLink } from "mdbreact";
import { Switch, withRouter, Route, Link } from "react-router-dom";
import ManagerCoSoDaoTaoGiangVienAdd from "./ManagerCoSoDaoTaoGiangVienAdd";
import { tableManagerGiangVien } from "../services/table";
import { JSONisEmpty } from "../services/multifunctional";

class ManagerCoSoVatChatGiangVien extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    handlerInputChange = e => {
        this.setState({[e.target.id]: e.target.value})
    }
    handleUpdate = (id, csdt) => {
        this.props.updateCoSoDaoTao(id, csdt)
    }

    handlerRemove = (id) => {
        this.props.removeCoSoDaoTao(id)
    }
    componentDidMount(){
    }

    render() {
        const { success, errors, coSoDaoTao } = this.props;
        var table, data;

        if(!JSONisEmpty(coSoDaoTao)){
            if(coSoDaoTao.hasOwnProperty('danhSachGiangVien')){
                if(coSoDaoTao.danhSachGiangVien.hasOwnProperty('giangVien')){
                    var giangViens = coSoDaoTao.danhSachGiangVien.giangVien.map((giangVien, i) => {
                        console.log(giangVien);

                        var ngaySinh, monHocs, chungChi, monHoc, hocHam, hocVi;

                        ngaySinh = new Date(giangVien.userInformation.ngaySinh).toLocaleDateString('en-GB');

                        monHoc = giangVien.userInformation.monHoc.map((monHoc, i) => {
                            return <div className="">{monHoc}</div>
                        })

                        chungChi = giangVien.userInformation.chungChi.map((chungChi, i) => {
                            return <div className="">{chungChi}</div>
                        })

                        return {
                            hoTen: giangVien.userInformation.hoTen,
                            ngaySinh: ngaySinh,
                            chungChi: chungChi,
                            hocHam: giangVien.userInformation.hocHam,
                            hocVi: giangVien.userInformation.hocVi,
                            monHoc: monHoc,

                            tiengAnh: giangVien.userInformation.tiengAnh,
                            tinHoc: giangVien.userInformation.tinHoc,
                        }
                    })
                    data = {
                        columns: [
                            {
                                label: "Tên",
                                field: "hoTen",
                                width: 100
                            },
                            {
                                label: "Ngày sinh",
                                field: "ngaySinh",
                                width: 50
                            },
                            {
                                label: "Học hàm",
                                field: "hocHam",
                                width: 10
                            },
                            {
                                label: "Học vị",
                                field: "hocVi",
                                width: 10
                            },
                            {
                                label: "Môn học",
                                field: "monHoc",
                                width: 10
                            },
                            {
                                label: "Chứng chỉ",
                                field: "chungChi",
                                width: 10
                            },
                            {
                                label:"Tiếng Anh",
                                field: "tiengAnh",
                                width: 10
                            },
                            {
                                label:"Tin học",
                                field: "tinHoc",
                                width: 10
                            },
                        ],
                        rows: giangViens
                    }

                    table = <MDBDataTable
                        reponsive="true"
                        striped
                        bordered
                        hover
                        data={data}
                    />
                }
            }

        }
        const csvcType=["Phòng Học", "Thiết bị mô phỏng", "Thiết bị thực hành"];
        var optionCSVCType = csvcType.map((d,i) => {
            return (
                <option value={d} key={i}>{d}</option>
            )
        })
        return (
            <div>
                {errors.message && (
                    <div className="alert alert-danger" role="alert">
                        {errors.message}
                    </div>
                )}
                {success.message && (
                    <div className="alert alert-success" role="alert">
                        {success.message}
                    </div>
                )}
                <Switch>
                    <Route
                        exact
                        path={`${this.props.match.url}/`}
                        render={() =>
                            <div>
                                <Link
                                    style={{outLine:"none"}}
                                    className="btn btn-default m-0 mb-2"
                                    to={`${this.props.match.url}/add`}
                                >
                                    Thêm giảng viên
                                </Link>
                                {table}
                            </div>
                        }
                    />
                    <Route
                        exact
                        path={`${this.props.match.url}/add`}
                        render={() =>
                            <ManagerCoSoDaoTaoGiangVienAdd
                                {...this.props}
                            />
                        }
                    />
                </Switch>

            </div>
        )
    }
}

export default withRouter(ManagerCoSoVatChatGiangVien);
