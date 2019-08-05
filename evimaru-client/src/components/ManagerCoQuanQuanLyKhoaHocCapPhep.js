import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, Input, ModalFooter, MDBDataTable } from "mdbreact";
import KhoaHocCapPhepItem from "./KhoaHocCapPhepItem";
import { JSONisEmpty, getIdFromArray } from "../services/multifunctional";
import MyDefaultStyleTable from "./MyDefaultStyleTable";

class ManagerCoQuanQuanLyKhoaHocCapPhep extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapse: false,
            modal: false,
            khoaHocSelected: "",
            soQuyetDinh: "",
            ngayDuocCap: "",
            ngayHetHan: "",
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
    handlerSelected = (khoaHocFind) => {
        // console.log(khoaHocFind);
        this.toggle();
        this.setState({khoaHocSelected: khoaHocFind})
        console.log(khoaHocFind);

    }

    handlerPost = (id) => {
        this.props.capPhepKhoaHoc(
            this.state.khoaHocSelected.khoaHoc,
            {
                soQuyetDinh: this.state.soQuyetDinh,
                ngayDuocCap: this.state.ngayDuocCap,
                ngayHetHan: this.state.ngayHetHan,
                khoaHocCapPhep: this.state.khoaHocSelected._id
            }
        );
        this.toggle();
    }

    render() {
        const { coSoDaoTaos, nhomKhoaHocs, capPhepKhoaHoc, success, errors, match } = this.props;
        const { khoaHocSelected } = this.state;
        var capPhepList, nhomKhoaHoc, khoaHoc, table, data;
        var csdtName;
        if(!JSONisEmpty(nhomKhoaHocs)){
            nhomKhoaHoc = getIdFromArray(match.params.nhomKhoaHocId, nhomKhoaHocs);
            if(nhomKhoaHoc.hasOwnProperty('khoaHoc')){
                khoaHoc = getIdFromArray(match.params.khoaHocId, nhomKhoaHoc.khoaHoc);
                // console.log(nhomKhoaHoc);
                if(!JSONisEmpty(coSoDaoTaos)){
                    var filterNhom = [], filterKhoaHoc = [];
                    let i=0;
                    coSoDaoTaos.map((csdt, i) =>{
                        filterNhom.push(csdt.nhomKhoaHoc.find(nkh => nkh.name == nhomKhoaHoc.name));

                    })
                    // console.log(filterNhom);
                    filterNhom.map((nkh, i) => {
                        // console.log(nkh.khoaHoc);
                        filterKhoaHoc.push(nkh.khoaHoc.find(kh => kh.name == khoaHoc.name));
                    })


                    capPhepList = coSoDaoTaos.map((csdt, i) => {
                        var khoaHocFind = filterKhoaHoc.find(kh => kh.coSoDaoTao._id == csdt._id);
                        // console.log(filterKhoaHoc);
                        var ngayDC, ngayHH;
                        ngayDC = new Date(khoaHocFind.ngayDuocCap);
                        ngayHH = new Date(khoaHocFind.ngayHetHan);
                        let btnTinhTrang = ngayDC>=ngayHH ?
                                <button type="button" className="btn btn-primary border-0 w-100" disabled >Đã hết hạn</button>:
                                <button type="button" className="btn btn-danger border-0 w-100" disabled >Đã cấp phép</button>;
                        let btnCapPhep = <Button type="button" className="w-100" color="primary" onClick={this.handlerSelected.bind(this, khoaHocFind)}>Cấp phép</Button>;
                        return {
                            coSoDaoTao: csdt.name,
                            soQuyetDinh: khoaHocFind.soQuyetDinh,
                            ngayDuocCap: ngayDC.toLocaleDateString('en-GB'),
                            ngayHetHan: ngayHH.toLocaleDateString('en-GB'),
                            tinhTrang: btnTinhTrang,
                            capPhep: btnCapPhep,
                        }
                    })
                    data = {
                        columns: [
                            {
                                label: "Cơ sở đào tạo",
                                field: "coSoDaoTao",
                                width: 5
                            },
                            {
                                label: "Số quyết định",
                                field: "soQuyetDinh",
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
                                label: "Cấp phép",
                                field: "capPhep",
                                width: 5
                            },
                        ],
                        rows: capPhepList
                    }

                    table = <div className="mt-3 text-wrap">
                        <MDBDataTable
                            reponsive="true"
                            bordered
                            hover
                            data={data}
                        />
                    </div>

                    if(!JSONisEmpty(khoaHocSelected)){
                        csdtName = <div>{khoaHocSelected.coSoDaoTao.name}</div>
                    }
                    // clickItem = (position) => {
                    //
                    //     this.setState({khoaHocSelected: capPhepList[position]})
                    //     console.log(this.state.khoaHocSelected);
                    // }
                    // console.log(coSoDaoTaos);
                }
                return (
                    <div>
                        {success.message && (
                            <div className="alert alert-success" role="alert">
                                {success.message}
                            </div>
                        )}
                        <h2>Nhóm: {nhomKhoaHoc.name}</h2>
                        <h3>Khóa học: {khoaHoc.name}</h3>
                        {table}

                        <Modal isOpen={this.state.modal} toggle={this.toggle} >
                            <form>
                                <ModalHeader toggle={this.toggle}>Cấp phép khóa học: {khoaHocSelected.name}</ModalHeader>
                                <ModalBody>
                                    {csdtName}
                                    <Input
                                        label="Số quyết định"
                                        id="soQuyetDinh"
                                        onChange={this.handlerInputChange}
                                        required
                                        value={this.state.soQuyetDinh}
                                    />
                                    <label htmlFor="ngayDuocCap">
                                        <span style={{fontSize: "20px"}}>Ngày được cấp</span>
                                    </label>
                                    <input
                                        type="date"
                                        data-date-format="DD MMMM YYYY"
                                        data-date=""
                                        min="2005-01-01"
                                        max="2040-01-01"
                                        className="form-control"
                                        id="ngayDuocCap"
                                        onChange={this.handlerInputChange}
                                        value={this.state.ngayDuocCap}
                                        required
                                    />
                                <label htmlFor="ngayHetHan">
                                        <span style={{fontSize: "20px"}}>Ngày hết hạn</span>
                                    </label>
                                    <input
                                        type="date"
                                        data-date-format="DD MMMM YYYY"
                                        data-date=""
                                        min="2005-01-01"
                                        max="2040-01-01"
                                        className="form-control"
                                        id="ngayHetHan"
                                        onChange={this.handlerInputChange}
                                        value={this.state.ngayHetHan}
                                        required
                                    />

                                </ModalBody>
                                <ModalFooter>
                                    <Button type="button" color="secondary" onClick={this.toggle}>Hủy</Button>{' '}
                                    <Button type="button" color="primary" onClick={this.handlerPost}>Cấp phép</Button>
                                </ModalFooter>
                            </form>
                        </Modal>
                    </div>
                )
            }
        }
        return (
            <div>ERROR</div>
        )
    }
}

export default withRouter(ManagerCoQuanQuanLyKhoaHocCapPhep);
