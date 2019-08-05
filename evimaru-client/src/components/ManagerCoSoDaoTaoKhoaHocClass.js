import React, { Component } from "react";
import { withRouter, Link, Switch, Route } from "react-router-dom";
import { Button, MDBDataTable } from "mdbreact";
import NavbarBackLink from "../components/NavbarBackLink";
import MyDefaultStyleTable from "./MyDefaultStyleTable";
import { JSONisEmpty, getIdFromArray } from "../services/multifunctional";

class ManagerCoSoDaoTaoKhoaHocClass extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        const { success, errors, khoaHoc, nhomKhoaHoc, match, history } = this.props;

        var table, data, lopHocs;
        if(!JSONisEmpty(khoaHoc)){
            if(khoaHoc.hasOwnProperty('lopHoc')){
                var { lopHoc } = khoaHoc;
                lopHocs = lopHoc.map((lopHoc, i) => {
                    let soLuongHocVien, giangViens, gioiGianHocVien, buoiHoc, ngayHoc, thoiGianHoc, xemChiTiet, xemDanhSachHocVien;
                    let ngayBatDauDate, ngayKetThucDate;
                    let ngayHocStyle = {fontSize: "14px"};
                    ngayBatDauDate = new Date(lopHoc.thoiGian.ngayBatDau).toLocaleDateString('en-GB');
                    ngayKetThucDate = new Date(lopHoc.thoiGian.ngayKetThuc).toLocaleDateString('en-GB');
                    ngayHoc = <div style={ngayHocStyle}>{ngayBatDauDate} đến {ngayKetThucDate}</div>
                    buoiHoc = lopHoc.thoiGian.buoiHoc.map((bh, i) => {
                        return (
                            <div>{bh.ngayHoc} - {bh.gioHoc}</div>
                        )
                    })
                    giangViens = lopHoc.giangVien.map((gv, i) => {
                        return (
                            <div>{gv.userInformation.hoTen}</div>
                        )
                    })
                    thoiGianHoc =
                        <div>
                            {ngayHoc}
                        </div>
                    xemChiTiet =
                        <Link
                            style={{outLine:"none"}}
                            className="btn btn-default m-0 mb-2 mt-2 mr-2 w-100"
                            to={`${match.url}/${lopHoc._id}`}
                        >
                            Chi tiết
                        </Link>
                    xemDanhSachHocVien =
                        <Link
                            style={{outLine:"none"}}
                            className="btn btn-default m-0 mb-2 mt-2 mr-2 w-100"
                            to={`${match.url}/${lopHoc._id}/dshv`}
                        >
                            Xem
                        </Link>
                    return {
                        tenLop: lopHoc.tenLop,
                        thoiGianHoc: thoiGianHoc,
                        giangViens: giangViens,
                        gioiGianHocVien: lopHoc.gioiHanHocVien,
                        daDangKy: lopHoc.danhSachHocVien.length,
                        tinhTrang: lopHoc.tinhTrang,
                        xemDanhSachHocVien: xemDanhSachHocVien,
                        chiTiet: xemChiTiet
                    }
                })

                data = {
                    columns: [
                        {
                            label: "Tên lớp",
                            field: "tenLop",
                            width: 5
                        },
                        {
                            label: "Thời gian",
                            field: "thoiGianHoc",
                            width: 5
                        },
                        {
                            label: "Giảng Viên",
                            field: "giangViens",
                            width: 5
                        },
                        {
                            label: "Tối đa",
                            field: "gioiGianHocVien",
                            width: 5
                        },
                        {
                            label: "Đã ĐK",
                            field: "daDangKy",
                            width: 5
                        },
                        {
                            label: "Tình trạng",
                            field: "tinhTrang",
                            width: 5
                        },
                        {
                            label: "Danh sách học viên",
                            field: "xemDanhSachHocVien",
                            width: 5
                        },
                        {
                            label: "Chi tiết",
                            field: "chiTiet",
                            width: 5
                        },

                    ],
                    rows: lopHocs
                }

                table = <div className="mt-3 text-wrap">
                    <MDBDataTable
                        reponsive="true"
                        bordered
                        hover
                        data={data}
                    />
                </div>

                var backLinkArr = [
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
                ]

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
                               path={`${match.url}`}
                               render={() => (
                                   <div>
                                       <NavbarBackLink
                                           backLinkArr={backLinkArr}
                                       />
                                       <Link
                                           style={{outLine:"none"}}
                                           className="btn btn-default m-0 mb-2 mt-2 mr-2"
                                           to={`${match.url}/add`}
                                       >
                                           Thêm lớp
                                       </Link>
                                       {table}
                                   </div>
                               )}
                            />

                        </Switch>

                    </div>
                )

            }

        } else {
            return <div>ERROR</div>
        }
    }
}

export default withRouter(ManagerCoSoDaoTaoKhoaHocClass);
