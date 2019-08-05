import React, {Component} from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Animation, Card, CardBody, Input, Button } from "mdbreact";
import {getUserInformation, postUserInformation} from "../store/actions/user-information";
import { removeError } from "../store/actions/errors";
import { removeSuccess } from "../store/actions/success";

class InforUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            hoTen: "",
            ngaySinh: "",
            soDienThoai: "",
            maSoThuyenVien: ""
        }
    }
    handlerInputChange = e => {
        this.setState({[e.target.id]: e.target.value})
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.postUserInformation(this.state);
    }
    componentDidMount(){
        this.props.getUserInformation()
        .then(() => {
            var dat = this.props.userInformation;
            let date = new Date(dat.ngaySinh);
            dat.ngaySinh = date.toLocaleDateString();
            this.setState({...dat})
        })
        .catch(err => console.log(err))
    }
    render(){
        const { history, success, errors, removeError, removeSuccess } = this.props;
        // history.listen((a) => {
        //
        //     removeError();
        //     removeSuccess();
        // })
        return(
            <Animation type="fadeInRight">
                <Card className="mb-3">
                    <h5 className="card-header  light-blue darken-1 white-text text-center py-4" >
                        Thông tin người dùng
                    </h5>
                    <CardBody>
                        <form onSubmit={this.handleSubmit}>
                            <Input
                                label="Họ và tên"
                                icon="user-circle-o"
                                id="hoTen"
                                onChange={this.handlerInputChange}
                                required
                                value={this.state.hoTen}
                            />
                            <label htmlFor="inputPassword4">
                                <span style={{fontSize: "20px"}}><i className="fa fa-birthday-cake" aria-hidden="true"></i> Ngày sinh </span>
                                <Moment className="text-muted" format="Do MMM YYYY">
                                    {this.props.currentUser.user.ngaySinh}
                                </Moment>
                            </label>
                            <input
                                type="date"
                                data-date-format="DD MMMM YYYY"
                                data-date=""
                                max="2005-01-01"
                                className="form-control"
                                id="ngaySinh"
                                onChange={this.handlerInputChange}
                                value={this.state.ngaySinh}
                                required
                            />

                            <Input
                                label="Số điện thoại"
                                icon="lock"
                                id="soDienThoai"
                                onChange={this.handlerInputChange}
                                value={this.state.soDienThoai}
                                required
                            />
                            <Input
                                label="Mã số thuyền viên"
                                icon="ship"
                                id="maSoThuyenVien"
                                onChange={this.handlerInputChange}
                                value={this.state.maSoThuyenVien}
                                type="text"
                                required/>
                            <Button type="submit" className="light-blue darken-1">Lưu</Button>
                        </form>
                    </CardBody>
                </Card>
            </Animation>
        )
    }
}

function mapStateToProps(state) {
    return {
        userInformation: state.userInformation,
        currentUser: state.currentUser,
        success: state.success,
        errors: state.errors
    };
}

export default connect(mapStateToProps, { getUserInformation, postUserInformation, removeSuccess, removeError }) (InforUser);
