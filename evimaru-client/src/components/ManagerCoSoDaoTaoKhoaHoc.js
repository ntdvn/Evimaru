import React, { Component} from "react";
import { Link, withRouter } from "react-router-dom";
import { Input, Button, MDBDataTable, Modal, ModalHeader, ModalBody, ModalFooter } from "mdbreact";
import { tableManagerKhoaHocCapPhep } from "../services/table";
import KhoaHocManagerCoSoDaoTaoItem from "./KhoaHocManagerCoSoDaoTaoItem";
import MyDefaultStyleTable from "./MyDefaultStyleTable";
import { JSONisEmpty } from "../services/multifunctional"

class ManagerCoSoDaoTaoKhoaHoc extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            name: "",
            type: "",
            detail: "",
            quantity: undefined,
            condition: ""
        }
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    handlerInputChange = e => {
        this.setState({[e.target.id]: e.target.value})
    }
    handlerPostActiveCourse = (id, key) => {
        this.props.postActiveKhoaHoc(
            id,
            { activeKey: key }
        )
    }

    componentDidMount(){
    }

    render() {
        const { success, errors, coSoDaoTao, match, history } = this.props;
        var listKhoaHocManagerItems, data, table;
        if(!JSONisEmpty(coSoDaoTao)){
            var nhomKhoaHoc = coSoDaoTao.nhomKhoaHoc.find(nhomKhoaHoc => nhomKhoaHoc._id===this.props.match.params.nhomKhoaHocId)
            var table;
            if(nhomKhoaHoc.hasOwnProperty('khoaHoc')){
                const { khoaHoc } = nhomKhoaHoc;
                listKhoaHocManagerItems = khoaHoc.map((khoaHoc, i) => {
                    let key;
                    if(khoaHoc.activeCourse)  key=false;
                    else key=true;

                    let ngayDuocCapDate, ngayHetHanDate, today;
                    ngayDuocCapDate = new Date(khoaHoc.ngayDuocCap);
                    ngayHetHanDate = new Date(khoaHoc.ngayHetHan);
                    today = new Date();

                    var buttonMoLop, divActived, textButton, tinhTrang, chiTietKhoaHoc;
                    if(ngayDuocCapDate>today || ngayHetHanDate<today){
                        // buttonMoLop = <button type="button" className="btn btn-primary border-0 w-100" >Đã hết hạn</button>;
                        tinhTrang = "Đã hết hạn";
                        chiTietKhoaHoc = <div
                            style={{outLine:"none"}}
                            className="btn special-color m-0 mb-2 mt-2 mr-2 w-100"
                        >
                            Đã hết hạn
                        </div>
                    }
                    else if(ngayDuocCapDate<today && today<ngayHetHanDate){
                        tinhTrang = "Được cấp phép";
                        // buttonMoLop = <button type="button" className="btn btn-danger border-0 w-100" >Đã cấp phép</button>;
                        // buttonMoLop = <button type="button" className="btn btn-danger border-0 w-100" onClick={this.handlerPostActiveCourse.bind(this, khoaHoc._id, key)}>{textButton}</button>
                        chiTietKhoaHoc =
                        <Link
                            style={{outLine:"none"}}
                            className="btn btn-default m-0 mb-2 mt-2 mr-2 w-100"
                            to={`${match.url}/khoahoc/${khoaHoc._id}/information`}
                        >
                            Chi tiết
                        </Link>
                    }



                    return {
                        khoaHocName: khoaHoc.name,
                        khoaHocCode: khoaHoc.code,
                        ngayDuocCap: ngayDuocCapDate.toLocaleDateString('en-GB'),
                        ngayHetHan: ngayHetHanDate.toLocaleDateString('en-GB'),
                        // activeCourse: buttonMoLop,
                        tinhTrang: tinhTrang,
                        chiTiet: chiTietKhoaHoc,
                        // khoaHocId: khoaHoc._id,
                    }
                })

                data = {
                    columns: [
                        {
                            label: "Tên khóa học",
                            field: "khoaHocName",
                            width: 5
                        },
                        {
                            label: "Mã",
                            field: "khoaHocCode",
                            width: 5
                        },
                        {
                            label: "Ngày được cấp",
                            field: "ngayDuocCap",
                            width: 5
                        },
                        {
                            label: "Ngày hết hạn",
                            field: "ngayHetHan",
                            width: 5
                        },
                        {
                            label: "Tình trạng",
                            field: "tinhTrang",
                            width: 5
                        },
                        {
                            label: "Chi tiết",
                            field: "chiTiet",
                            width: 5
                        },
                    ],
                    rows: listKhoaHocManagerItems
                }
                table = <div className="mt-3 text-wrap">
                    <MDBDataTable
                        reponsive="true"
                        bordered
                        hover
                        data={data}
                    />
                </div>

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
                        <h2>{nhomKhoaHoc.name}</h2>
                        {table}

                    </div>
                )
            }
        }
        return (
            <div>ERROR</div>
        )
    }
}

export default withRouter(ManagerCoSoDaoTaoKhoaHoc);
