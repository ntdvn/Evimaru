import React, { Component} from "react";
import { Input, Button, MDBDataTable, Modal, ModalHeader, ModalBody, ModalFooter, NavLink } from "mdbreact";
import { withRouter, Link } from "react-router-dom";
import { JSONisEmpty } from "../services/multifunctional";

class ManagerCoSoDaoTaoLienHe extends Component{
    constructor(props){
        super(props);
        this.state = {
            diaChi: "",
            soDienThoai: "",
            Fax: "",
            Email: "",
            Website: ""
        }
    }

    handlerInputChange = e => {
        this.setState({[e.target.id]: e.target.value})
    }
    handlerUpdateLienHe = (csdtId, e) => {
        e.preventDefault();
        this.props.postOrUpdateLienHe(
            csdtId,
            {
                ...this.state
            }
        )
    }

    componentWillReceiveProps(newProps) {
        const { coSoDaoTao } = newProps;
        this.setState({...coSoDaoTao.lienHe})
    }

    componentDidMount(){

    }

    render() {
        const { success, errors, coSoDaoTao, match, history } = this.props;
        if(!JSONisEmpty(coSoDaoTao)){
            // console.log(this.props.createOrUpdateLienHe);
            return (
                <div>

                    <h2 className="my-3">Cập nhật thông tin liên hệ: {coSoDaoTao.name}</h2>

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

                    <form onSubmit={this.handlerUpdateLienHe.bind(this, coSoDaoTao._id)}>
                        <div className="row">
                            <div className="col-md-12">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="input-diachi">Địa chỉ</span>
                                    </div>
                                    <input
                                        id="diaChi"
                                        type="text"
                                        class="form-control"
                                        placeholder="Địa chỉ"
                                        aria-label="Địa chỉ"
                                        aria-describedby="input-diachi"
                                        onChange={this.handlerInputChange}
                                        value={this.state.diaChi}
                                        required
                                     />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="input-soDienThoai">Số điện thoại</span>
                                    </div>
                                    <input
                                        id="soDienThoai"
                                        type="text"
                                        class="form-control"
                                        placeholder="Số điện thoại"
                                        aria-label="Số điện thoại"
                                        aria-describedby="input-soDienThoai"
                                        onChange={this.handlerInputChange}
                                        value={this.state.soDienThoai}
                                        required
                                     />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="input-fax">Số Fax</span>
                                    </div>
                                    <input
                                        id="Fax"
                                        type="text"
                                        class="form-control"
                                        placeholder="Số Fax"
                                        aria-label="Số Fax"
                                        aria-describedby="input-fax"
                                        onChange={this.handlerInputChange}
                                        value={this.state.Fax}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="input-email">Email</span>
                                    </div>
                                    <input
                                        id="Email"
                                        type="text"
                                        class="form-control"
                                        placeholder="Email"
                                        aria-label="Email"
                                        aria-describedby="input-email"
                                        onChange={this.handlerInputChange}
                                        value={this.state.Email}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="input-website">Website</span>
                                    </div>
                                    <input
                                        id="Website"
                                        type="text"
                                        class="form-control"
                                        placeholder="Website"
                                        aria-label="Website"
                                        aria-describedby="input-website"
                                        onChange={this.handlerInputChange}
                                        value={this.state.Website}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <Button type="submit" className="btn btn-default m-0 mb-2">Cập nhật</Button>
                    </form>

                </div>
            )
        } return (
            <div>ERROR</div>
        )
        console.log(coSoDaoTao);

    }
}

export default ManagerCoSoDaoTaoLienHe;
