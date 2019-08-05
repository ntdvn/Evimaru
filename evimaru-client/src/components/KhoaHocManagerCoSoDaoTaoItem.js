import React, { Component } from "react";
import { Link } from "react-router-dom";
import defaultKhoaHoc from "../images/default_khoaHoc.jpg";
import { Button } from "mdbreact";
import { truncate, getDateTimeFromData } from "../services/multifunctional"

class KhoaHocManagerCoSoDaoTaoItem extends Component {
    constructor(props){
        super(props);
    }
    defaultImage(e){
        e.target.src = defaultKhoaHoc
    }
    // toLocaleDateString('en-GB')
    render() {
        const { match, khoaHoc, postActiveCourse } = this.props;
        const { name, code, _id, gioiThieu, imageUrl, ngayDuocCap, ngayHetHan, soQuyetDinh, activeCourse } = khoaHoc;
        // console.log(khoaHoc);
        var ngayDuocCapDate, ngayHetHanDate, today;

        var divActived, textButton;



        ngayDuocCapDate = new Date(ngayDuocCap);
        ngayHetHanDate = new Date(ngayHetHan);
        today = new Date();
        var buttonMoLop;
        if(activeCourse){
            divActived = <div>Tình trạng: đang mở</div>;
            textButton = "Đóng khóa học";
        } else {
            divActived = <div>Tình trạng: chưa mở</div>;
            textButton = "Mở khóa học";
        }
        if(ngayDuocCapDate>today || ngayHetHanDate<today){
            buttonMoLop = <button type="button" className="btn btn-primary border-0" disabled >Đã hết hạn</button>;
        }
        else if(ngayDuocCapDate<today && today<ngayHetHanDate){
            buttonMoLop = <button type="button" className="btn btn-danger border-0" onClick={postActiveCourse}>{textButton}</button>
        }



        return (
            <div>
                <div className="row p-0 m-0">
                    <div className="col-md-4 p-0 m-0">
                        <img
                            src={imageUrl||defaultKhoaHoc}
                            alt="Image not found"
                            onError={this.defaultImage}
                            className="img-thumbnail img-fluid"
                            style={{width: "100%", height: "250px"}}
                        />
                    </div>
                    <div className="col-md-8 p-0 m-0 pl-3">
                        <h3>{name}</h3>
                        <h5><strong>Code: </strong>{code}</h5>
                        <div>Ngày được cấp: {getDateTimeFromData(ngayDuocCap)}</div>
                        <div>Ngày hết hạn: {getDateTimeFromData(ngayHetHan)}</div>
                        <div>Số quyết định: {soQuyetDinh}</div>
                        { divActived }
                        <Link
                            style={{outLine:"none"}}
                            className="btn btn-default m-0 mb-2 mt-2 mr-2"
                            to={`${match.url}/khoahoc/${_id}/information`}
                        >
                            Sửa chi tiết khóa học
                        </Link>
                        { buttonMoLop }
                    </div>
                </div>
                <hr className="style-two"/>
            </div>
        )
    }
}

export default KhoaHocManagerCoSoDaoTaoItem;
