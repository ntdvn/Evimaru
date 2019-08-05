import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Input, MDBDataTable, Modal, ModalHeader, ModalBody, ModalFooter } from "mdbreact";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavbarBackLink from "../components/NavbarBackLink";
import ResultPDF from "../components/defaultPDFfile";
import { JSONisEmpty, getIdFromArray } from "../services/multifunctional";

class ManagerCoSoDaoTaoHocVien extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            hocVienSelected: "",
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    handlerInputChange = e => {
        const { hocVienSelected } = this.state;
        this.setState({
                hocVienSelected: {
                ...hocVienSelected,
                [e.target.id]: e.target.value
            }
        })
    }
    selectHocVien = (hocVien) => {
        this.toggle();
        // console.log(hocVien);
        this.setState({hocVienSelected: hocVien})
    }
    onChangeCheckBox = e => {
        const { hocVienSelected } = this.state;
        this.setState({
            hocVienSelected: {
                ...hocVienSelected,
                [e.target.id]: !!e.target.checked
            }
        })
    }

    handlerPostUpdate = (e) => {
        e.preventDefault();
        // console.log("haha");
        const { hocVienSelected } = this.state;
        this.props.postUpdateKhoaHocDangKy(hocVienSelected.khoaHocDangKyId, hocVienSelected)
    }

    handleChangeDate = (target, date) => {
        const { hocVienSelected } = this.state;
        this.setState({
            hocVienSelected: {
                ...hocVienSelected,
                [target]: date
            }
        })
    }

    render() {
        const { success, errors, khoaHoc, nhomKhoaHoc, match, history } = this.props;
        const { hocVienSelected } = this.state;
        var table, data, thisLopHoc, hocViens, backLinkArr;
        if(!JSONisEmpty(khoaHoc)){
            if(khoaHoc.hasOwnProperty('lopHoc')){
                const { lopHoc } = khoaHoc;
                thisLopHoc = getIdFromArray(match.params.classId, lopHoc)
                if(thisLopHoc.hasOwnProperty('danhSachHocVien')){
                    const { danhSachHocVien } = thisLopHoc;
                    hocViens = danhSachHocVien.map((hocVien, i) => {
                        // console.log(hocVien);
                        let ngaySinh, hocTrenLop, ketQuaHocOnline, hocOnline, hocKhongOnline, passed, suaThongTin, hocVienResult, hocVienData, inKetQuaHoc;
                        ngaySinh = new Date(hocVien.userInformation.ngaySinh).toLocaleDateString('en-GB');
                        let quaTrinhHoc = hocVien.khoaHocDangKy.find(khoaHocDangKy => khoaHoc._id == khoaHocDangKy.khoaHoc._id && thisLopHoc._id == khoaHocDangKy.lopHoc._id)
                        hocTrenLop =
                            <div className="check-box-giangvien-container">
                                <input
                                    type="checkbox"
                                    // id={}
                                    className="check-box-giangvien"
                                    value="true"
                                    checked={quaTrinhHoc.hocTrenLop}
                                />
                            </div>

                        hocOnline =
                            <div className="check-box-giangvien-container">
                                <input
                                    type="checkbox"
                                    // id={}
                                    className="check-box-giangvien"
                                    value="true"
                                    checked={quaTrinhHoc.hocOnline}
                                />
                            </div>

                        hocKhongOnline =
                            <div className="check-box-giangvien-container">
                                <input
                                    type="checkbox"
                                    // id={}
                                    className="check-box-giangvien"
                                    value="true"
                                    checked={quaTrinhHoc.hocKhongOnline}
                                />
                            </div>
                        ketQuaHocOnline = quaTrinhHoc.ketQuaHocOnline.soCauTraLoiDung + "/" +quaTrinhHoc.ketQuaHocOnline.chiTiet.length

                        hocVienData = {
                            hoTen: hocVien.userInformation.hoTen,
                            ngaySinh: ngaySinh,
                            hocTrenLop: quaTrinhHoc.hocTrenLop,
                            hocOnline: quaTrinhHoc.hocOnline,
                            hocKhongOnline: quaTrinhHoc.hocKhongOnline,
                            chungChi: quaTrinhHoc.chungChi,
                            passed: quaTrinhHoc.passed,
                            ngayCapChungChi: quaTrinhHoc.ngayCapChungChi,
                            ngayHetHanChungChi: quaTrinhHoc.ngayHetHanChungChi,
                            khoaHocDangKyId: quaTrinhHoc._id
                        }

                        suaThongTin =
                            <Button
                                className="m-0 py-2 px-4"
                                onClick={this.selectHocVien.bind(this, hocVienData)}
                            >
                            Sửa
                            </Button>

                        var time = new Date(quaTrinhHoc.updateAt).toLocaleTimeString("en-GB");
                        // var ketQua =  ? "Đạt" : "Chưa đạt";
                        console.log(quaTrinhHoc);
                        inKetQuaHoc =
                            <ResultPDF
                                data={quaTrinhHoc.ketQuaHocOnline.chiTiet}
                                time={time}
                                userInformation={hocVien.userInformation}
                                khoaHocDangKy={quaTrinhHoc}
                                ketLuan={quaTrinhHoc.passed}
                            />;

                        hocVienResult = {
                            hoTen: hocVien.userInformation.hoTen,
                            ngaySinh: ngaySinh,
                            hocOnline: ketQuaHocOnline,
                            hocKhongOnline: hocKhongOnline,
                            hocTrenLop: hocTrenLop,
                            chungChi: quaTrinhHoc.chungChi,
                            passed: quaTrinhHoc.passed,
                            suaThongTin: suaThongTin,
                            inKetQuaHoc: inKetQuaHoc
                        }

                        return hocVienResult;
                    })
                    // console.log(hocViens);

                    data = {
                        columns: [
                            {
                                label: "Tên học viên",
                                field: "hoTen",
                                width: 10
                            },
                            {
                                label: "Ngày sinh",
                                field: "ngaySinh",
                                width: 10
                            },
                            {
                                label: "Online",
                                field: "hocOnline",
                                width: 10
                            },
                            {
                                label: "Thay thế",
                                field: "hocKhongOnline",
                                width: 10
                            },
                            {
                                label: "Trên lớp",
                                field: "hocTrenLop",
                                width: 10
                            },
                            {
                                label: "Chứng chỉ",
                                field: "chungChi",
                                width: 10
                            },
                            {
                                label: "Kết quả",
                                field: "passed",
                                width: 10
                            },
                            {
                                label: "Chứng chỉ",
                                field: "suaThongTin",
                                width: 10
                            },
                            {
                                label: "In kết quả",
                                field: "inKetQuaHoc",
                                width: 10
                            },
                        ],
                        rows: hocViens
                    }

                    table = <div className="mt-3 text-wrap">
                        <MDBDataTable
                            reponsive="true"
                            bordered
                            hover
                            data={data}
                        />
                    </div>
                }
                backLinkArr  = [
                    {
                        name: `${nhomKhoaHoc.name}`,
                        link: `/user/manager/nhomkhoahoc/${nhomKhoaHoc._id}`,
                    },
                    {
                        name: `${khoaHoc.name}`,
                        link: `/user/manager/nhomkhoahoc/${nhomKhoaHoc._id}/khoahoc/${khoaHoc._id}/information`,
                    },
                    {
                        name: "Lớp học",
                        link: `/user/manager/nhomkhoahoc/${nhomKhoaHoc._id}/khoahoc/${khoaHoc._id}/information/class`,
                    },
                    {
                        name: `${thisLopHoc.tenLop} - Học viên`,
                        link: `/user/manager/nhomkhoahoc/${nhomKhoaHoc._id}/khoahoc/${khoaHoc._id}/information/class/${thisLopHoc._id}/dshv`,
                    },
                ]
            }
        }

        return (
            <div>
                <NavbarBackLink
                    backLinkArr={backLinkArr}
                />
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
                </div>
                {table}
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <form onSubmit={this.handlerPostUpdate}>
                        <ModalHeader toggle={this.toggle}>Sửa quá trình học</ModalHeader>
                        <ModalBody>
                            <h4 className="m-0">{hocVienSelected.hoTen}</h4>
                            <div className="blue-text bold mt-0">
                                <strong><i>{hocVienSelected.ngaySinh}</i></strong>
                            </div>
                            <div className="p-2 d-flex flex-row">
                                <h5 className="d-inline w-50 align-items-center d-3">Học trên lớp: </h5>
                                <input
                                    id="hocTrenLop"
                                    type="checkbox"
                                    className="check-box-giangvien w-50 align-items-center justify-content-center mt-2"
                                    checked={hocVienSelected.hocTrenLop}
                                    onChange={this.onChangeCheckBox}
                                />
                            </div>
                            <div className="p-2 d-flex flex-row">
                                <h5 className="d-inline w-50 align-items-center d-3">Học Online: </h5>
                                <input
                                    id="hocOnline"
                                    type="checkbox"
                                    className="check-box-giangvien w-50 align-items-center justify-content-center mt-2"
                                    checked={hocVienSelected.hocOnline}
                                    onChange={this.onChangeCheckBox}
                                />
                            </div>
                            <div className="p-2 d-flex flex-row">
                                <h5 className="d-inline w-50 align-items-center d-3">Học thay thế: </h5>
                                <input
                                    id="hocKhongOnline"
                                    type="checkbox"
                                    className="check-box-giangvien w-50 align-items-center justify-content-center mt-2"
                                    checked={hocVienSelected.hocKhongOnline}
                                    onChange={this.onChangeCheckBox}
                                />
                            </div>
                            <Input
                                label="Chứng chỉ"
                                id="chungChi"
                                onChange={this.handlerInputChange}
                                required
                                type="text"
                                value={hocVienSelected.chungChi}
                            />
                            <div>
                                <div>Ngày cấp chứng chỉ</div>
                                <DatePicker
                                    selected={hocVienSelected.ngayCapChungChi}
                                    onChange={this.handleChangeDate.bind(this, "ngayCapChungChi")}
                                />
                            </div>
                            <div>
                                <div>Ngày hết hạn chứng chỉ</div>
                                <DatePicker
                                    selected={hocVienSelected.ngayHetHanChungChi}
                                    onChange={this.handleChangeDate.bind(this, "ngayHetHanChungChi")}
                                />
                            </div>
                            <Input
                                label="Kết quả"
                                id="passed"
                                onChange={this.handlerInputChange}
                                required
                                type="text"
                                value={hocVienSelected.passed}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>Hủy</Button>{' '}
                            <Button type="submit" color="primary">Sửa</Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        )
    }
}

export default withRouter(ManagerCoSoDaoTaoHocVien);
