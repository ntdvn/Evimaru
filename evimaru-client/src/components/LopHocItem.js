import React, { Component } from "react";
import { Link } from "react-router-dom";
import defaultKhoaHoc from "../images/default_khoaHoc.jpg";
import { Button } from "mdbreact";
import { JSONisEmpty, getDateTimeFromData } from "../services/multifunctional"

class LopHocItem extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const { lopHoc, dangkyHoc } = this.props;
        const { tenLop, danhSachHocVien, gioiHanHocVien, giangVien, thoiGian, description } = lopHoc;
        var thoiGiangStr="";
        var ngayBatDauDate = new Date(thoiGian.ngayBatDau);
        var ngayKetThucDate = new Date(thoiGian.ngayKetThuc);
        var today = new Date();
        var giangViens = giangVien.map((giangVien, i) => {
            return <Button key={giangVien._id} color="info" className="p-1 ml-1">{giangVien.userInformation.hoTen}</Button>
        })


        var tinhTrang,buttonDangKy;
        if(ngayBatDauDate>today && ngayKetThucDate>today){
            tinhTrang = "Đang mở đăng ký"
            buttonDangKy = <Button onClick={dangkyHoc}>Đăng ký</Button>;
        }
        else if(ngayBatDauDate<today && ngayKetThucDate>today){
            tinhTrang = "Đang học";
            buttonDangKy = <Button color="warning" disabled>{tinhTrang}</Button>;
        }
        else if(ngayBatDauDate<today && ngayKetThucDate<today){
            tinhTrang = "Đang kết thúc";
            buttonDangKy = <Button color="grey" disabled>{tinhTrang}</Button>;
        }
        thoiGiangStr = thoiGian.buoiHoc.map((tg, i) => {
            return thoiGiangStr += tg.ngayHoc + " - " + tg.gioHoc +"    "
        })
        // console.log(thoiGian);
        return (
            <div className="my-3 card p-4">
                <div className="row   m-0">
                    <div className="col-md-6">
                        <h4><strong>Tên lớp: </strong>{tenLop}</h4>
                        <div><strong>Ngày bắt đầu: </strong>{getDateTimeFromData(thoiGian.ngayBatDau)}</div>
                        <div><strong>Ngày kết thúc: </strong>{getDateTimeFromData(thoiGian.ngayKetThuc)}</div>
                        <div>{thoiGiangStr}</div>
                        <div><strong>Đã đăng ký: </strong>{`${danhSachHocVien.length}/${gioiHanHocVien}`}</div>

                    </div>
                    <div className="col-md-6">
                        <div><strong>Giảng viên: </strong>{giangViens}</div>
                        <div><strong>Tình trạng: </strong>{tinhTrang}</div>
                    </div>
                    {buttonDangKy}
                </div>
            </div>
        )
    }
}

export default LopHocItem;
