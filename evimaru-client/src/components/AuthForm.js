import React, {Component} from "react";
import {Link} from "react-router-dom";
import { Animation, Button, Card, CardBody, CardImage, CardTitle, CardText, Collapse, Input, Fa, Tooltip } from 'mdbreact';
import {apiCall} from "../services/api"
class AuthForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            collapse: false,
            checkCodeName: "",
            username: "",
            password: "",
            hoTen: "",
            ngaySinh: "",
            maSoThuyenVien: "",
            email: "",
            code: ""

        };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(this.state);
    }
    handleSubmit = e => {
        e.preventDefault();
        const authType = this.props.signUp ? "signup": "login";
        this.props.onAuth(
            authType,
            {
                username: this.state.username,
                password: this.state.password,
                hoTen: this.state.hoTen,
                ngaySinh: this.state.ngaySinh,
                maSoThuyenVien: this.state.maSoThuyenVien,
                email: this.state.email,
                code: this.state.code
            }
        )
        .then(() => {
            this.props.history.push("/");
        })
    }
    handleCheckCode = e => {
        e.preventDefault();
        this.props.onCheckCode(this.state.code)
        .then(data => {
            this.setState({checkCodeName: data})
        })
        .catch(err => {
            this.setState({checkCodeName: ""})
        })
    }
    render(){
        const {email, username, password, code, checkCodeName} = this.state;
        const {heading, buttonText, signUp, errors, history, removeSuccess, removeError} = this.props;
        history.listen((a) => {
            // console.log(a);
            removeSuccess();
            removeError();

        })

        return(
            <Animation type="fadeIn">
                <div className="container mt-4">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6">
                            {errors.message && (
                                <div className="alert alert-danger" role="alert">
                                    {errors.message}
                                </div>
                            )}

                            <Card>
                                <h5 className="card-header  light-blue darken-1 white-text text-center py-4" >
                                    <strong>{buttonText}</strong>
                                </h5>
                                <CardBody>
                                    <form onSubmit={this.handleSubmit}>
                                        <Input
                                            label="Username"
                                            icon="user-circle-o"
                                            id="username"
                                            onChange={this.handleChange}
                                            required
                                        />
                                        <Input
                                            label="Password"
                                            icon="lock"
                                            type="password"
                                            id="password"
                                            onChange={this.handleChange}
                                            required
                                        />
                                        {signUp && (
                                            <div>
                                                <Input
                                                    label="Repeat-password"
                                                    icon="lock"
                                                    type="password"
                                                    id="repeat-password"
                                                    onChange={this.handleChange}
                                                />
                                                <Input
                                                    label="Họ và tên"
                                                    icon="info"
                                                    type="text"
                                                    id="hoTen"
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                            <label htmlFor="ngaySinh">
                                                    <span style={{fontSize: "20px"}}>Ngày sinh</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    data-date-format="DD MMMM YYYY"
                                                    data-date=""
                                                    min="1930-01-01"
                                                    max="2000-01-01"
                                                    className="form-control"
                                                    id="ngaySinh"
                                                    onChange={this.handleChange}
                                                    value={this.state.ngaySinh}
                                                    required
                                                />
                                                <Input
                                                    label="Quốc tịch"
                                                    icon="info"
                                                    type="text"
                                                    id="quocTich"
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                                <Input
                                                    label="Id number"
                                                    icon="info"
                                                    type="text"
                                                    id="idNumber"
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                                <Input
                                                    label="Mã số thuyền viên"
                                                    icon="info"
                                                    type="text"
                                                    id="maSoThuyenVien"
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                                <Input
                                                    label="E-mail"
                                                    icon="envelope-o"
                                                    type="email"
                                                    id="email"
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                                <div className="row">
                                                    <Button
                                                        className="col-md-4 "
                                                        color="info"
                                                        onClick={this.toggle}
                                                        style={{ marginBottom: "1rem" }}
                                                        >
                                                        Admin code
                                                    </Button>


                                                </div>

                                                <Collapse isOpen={this.state.collapse}>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <Input
                                                                label="Code"
                                                                type="password"
                                                                id="code"
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                        <div className="col-md-3">
                                                            <button
                                                                className="btn btn-outline red darken-5 mt-4 pl-2 pr-2"
                                                                type="button"
                                                                onClick={this.handleCheckCode}
                                                            >
                                                                Kiểm tra
                                                            </button>
                                                        </div>
                                                        {
                                                            checkCodeName && (
                                                                <div className="col-md-5 alert alert-success mt-4" role="alert">
                                                                    {checkCodeName}
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            !checkCodeName && (
                                                                <div className="col-md-5 alert alert-danger mt-4" role="alert">
                                                                    Mã không tồn tại
                                                                </div>
                                                            )
                                                        }

                                                    </div>


                                                </Collapse>

                                            </div>

                                        )}
                                        {!signUp && (
                                            <div className="d-flex justify-content-around">
                                                <div>
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="defaultLoginFormRemember"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="defaultLoginFormRemember"
                                                        >
                                                            Nhớ tài khoản
                                                        </label>
                                                    </div>
                                                </div>
                                                <div>
                                                    <a href="">Quên mật khẩu?</a>
                                                </div>
                                            </div>

                                        )}
                                        <button
                                            className="btn btn-outline light-blue darken-1 btn-block my-4"
                                            type="submit"
                                        >
                                            {buttonText}
                                        </button>
                                            {!signUp && (
                                                <p className="font-small grey-text d-flex justify-content-center">
                                                    Không có tài khoản?
                                                    <Link
                                                        to="/signup"
                                                        className="dark-grey-text font-weight-bold ml-1"
                                                    >
                                                        Tạo tài khoản
                                                    </Link>
                                                </p>
                                            )}
                                    </form>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </Animation>
        )
    }
}

export default AuthForm;
