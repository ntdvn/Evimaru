import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, Input, ModalFooter } from 'mdbreact';
import { getDateTimeFromData } from "../services/multifunctional";
class KhoaHocCapPhepItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapse: false,
            modal: false,
            soQuyetDinh: "",
            ngayDuocCap: "",
            ngayHetHan: "",
            khoaHoc: ""
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    handlerInputChange = e => {
        this.setState({[e.target.id]: e.target.value})
    }

    handlerPost = (id) => {
        this.props.capPhep(
            id,
            {
                soQuyetDinh: this.state.soQuyetDinh,
                ngayDuocCap: this.state.ngayDuocCap,
                ngayHetHan: this.state.ngayHetHan,
                khoaHoc: this.props.khoaHoc._id
            }
        );
        this.toggle();
    }

    render() {
        const { coSoDaoTao, khoaHoc, success, errors } = this.props;
        const { name } = coSoDaoTao;
        const { _id, soQuyetDinh, ngayDuocCap, ngayHetHan } = khoaHoc;
        console.log(khoaHoc);
        var ngayDC, ngayHH;
        ngayDC = new Date(ngayDuocCap);
        ngayHH = new Date(ngayHetHan);
        var btnHetHan = ngayDC>=ngayHH ?
                <button type="button" className="btn btn-primary border-0" disabled >Đã hết hạn</button>:
                <button type="button" className="btn btn-danger border-0" disabled >Đã cấp phép</button>;

        return (
            <div>

                <div>
                    <h4><strong>Cơ sở đào tạo: </strong>{name}</h4>
                    <h4><strong>Số quyết định: </strong>{ soQuyetDinh }</h4>
                    <h4><strong>Ngày được cấp: </strong>{getDateTimeFromData(ngayDuocCap)}</h4>
                    <h4><strong>Ngày hết hạn: </strong>{getDateTimeFromData(ngayHetHan)}</h4>
                    { btnHetHan }
                    <Button className="btn btn-default m-0 mb-2 mt-2" onClick={this.toggle}>Cấp phép</Button>
                    <hr className="style-two"/>
                </div>


                    <Modal isOpen={this.state.modal} toggle={this.toggle} >
                        <form>
                            <ModalHeader toggle={this.toggle}>Cấp phép khóa học</ModalHeader>
                            <ModalBody>
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
                                <Button type="button" color="primary" onClick={this.handlerPost.bind(this, khoaHoc.khoaHoc)}>Cấp phép</Button>
                            </ModalFooter>
                        </form>
                    </Modal>
            </div>
        )
    }
}

export default KhoaHocCapPhepItem;
