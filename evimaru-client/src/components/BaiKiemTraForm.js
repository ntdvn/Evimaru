import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Input, Button } from "mdbreact";
import { JSONisEmpty } from "../services/multifunctional";
class BaiKiemTraForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            cauHoi: [],
            noiDungCauHoi:"",
            dapAn1: "",
            checkDapAn1: false,
            dapAn2: "",
            checkDapAn2: false,
            dapAn3: "",
            checkDapAn3: false,
            dapAn4: "",
            checkDapAn4: false,
            loi:"",
            actionSua: false,
            actionThem: false,
            actionXoa: false,
            buttonDaChon: "",
        }
    }
    handlerInputChange = e => {
        this.setState({[e.target.id]: e.target.value})
    }
    handleCheckClick = e => {
        this.setState({ [e.target.id]: !this.state[e.target.id] });
    }
    handlerAddCauHoi = e => {
        e.preventDefault();
        if(this.state.checkDapAn1 == false && this.state.checkDapAn2 == false
            && this.state.checkDapAn3 == false && this.state.checkDapAn4 == false || this.state.noiDungCauHoi=="")
        {
            this.setState({loi: "Phải có một đáp án đúng Hoặc Chưa nhập nội dung câu hỏi"})
        } else {
            let cauHoi = {
                noiDungCauHoi: this.state.noiDungCauHoi,
                dapAn1: this.state.dapAn1,
                checkDapAn1: this.state.checkDapAn1,
                dapAn2: this.state.dapAn2,
                checkDapAn2: this.state.checkDapAn2,
                dapAn3: this.state.dapAn3,
                checkDapAn3: this.state.checkDapAn3,
                dapAn4: this.state.dapAn4,
                checkDapAn4: this.state.checkDapAn4,
            }
            this.setState({cauHoi: [...this.state.cauHoi, cauHoi]});
            this.setState({loi: ""})
        }
    }
    handlerOnclickCauHoi = (i) => {
        let cauHoi  = this.state.cauHoi[i];
        this.setState({...cauHoi, actionThem: false, actionSua: true, actionXoa: true, buttonDaChon: i});
        console.log(this.state.buttonDaChon);
    }
    handlerXoaCauHoi = () => {
        let cauHoi = this.state.cauHoi.filter((cauHoi, i) => {
            if(i!=this.state.buttonDaChon) return cauHoi;
        })
        this.setState({cauHoi: cauHoi});
    }
    handlerOnClickNew = (i) => {
        let cauHoi = {
            noiDungCauHoi: "",
            dapAn1:  "",
            checkDapAn1: false,
            dapAn2:  "",
            checkDapAn2: false,
            dapAn3:  "",
            checkDapAn3: false,
            dapAn4:  "",
            checkDapAn4: false,
        }
        this.setState({...cauHoi, actionThem: true, actionSua: false, actionXoa: false});
    }
    handlerSuaCauHoi = e => {
        let cauHoiState = {
            noiDungCauHoi: this.state.noiDungCauHoi,
            dapAn1: this.state.dapAn1,
            checkDapAn1: this.state.checkDapAn1,
            dapAn2: this.state.dapAn2,
            checkDapAn2: this.state.checkDapAn2,
            dapAn3: this.state.dapAn3,
            checkDapAn3: this.state.checkDapAn3,
            dapAn4: this.state.dapAn4,
            checkDapAn4: this.state.checkDapAn4,
        }
        let cauHois = this.state.cauHoi.map((cauHoi, i) => {
            if(i==this.state.buttonDaChon){
                return cauHoiState
            }
            else return cauHoi;
        })
        this.setState({cauHoi: cauHois});
    }
    render(){
        const { nhomKhoaHocs, match } = this.props;
        var nhomKhoaHoc, khoaHoc, listCauHoi;
        if(!JSONisEmpty(nhomKhoaHocs)){
            nhomKhoaHoc = nhomKhoaHocs.find(nhomKhoaHoc => nhomKhoaHoc._id == match.params.nhomKhoaHocId);
            khoaHoc = nhomKhoaHoc.khoaHoc.find(khoaHoc => khoaHoc._id == match.params.khoaHocId);
            listCauHoi = this.state.cauHoi.map((cauHoi, i) => (
                <Button onClick={this.handlerOnclickCauHoi.bind(this, i)} key={i}>{i+1}</Button>
            ))
            return(
                <div>
                    <h3>KHÓA HỌC: {khoaHoc.name}</h3>
                    <form onSubmit="">
                        <div>{this.state.loi}</div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="input-tenbaikiemtra">Tên bài kiểm tra</span>
                                </div>
                                <input
                                    id="tenBaiKiemTra"
                                    type="text"
                                    class="form-control"
                                    placeholder="Tên bài kiểm tra"
                                    aria-label="Tên bài kiểm tra"
                                    aria-describedby="input-tenbaikiemtra"
                                    onChange={this.handlerInputChange}
                                    value={this.state.tenBaiKiemTra}
                                    required
                                 />
                            </div>
                        <div style={{height: "200px", overflowY : 'scroll'}}>
                            <Button onClick={this.handlerOnClickNew}>New</Button>
                            {listCauHoi}
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <Input
                                     id="noiDungCauHoi"
                                     type="textarea"
                                     label="Nội dung câu hỏi"
                                     rows="3"
                                     onChange={this.handlerInputChange}
                                     value={this.state.noiDungCauHoi}
                                />
                            </div>
                            <div className="col-md-6">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="input-dapan1">
                                            <div className="custom-control custom-checkbox">
                                                 <input
                                                     type="checkbox"
                                                     className="custom-control-input"
                                                     id="checkDapAn1"
                                                     value={this.state.checkDapAn1}
                                                     onChange={this.handleCheckClick}
                                                     checked={this.state.checkDapAn1}
                                                 />
                                                <label className="custom-control-label" htmlFor="checkDapAn1">Đúng</label>
                                             </div>
                                        </span>
                                    </div>
                                    <textarea
                                        id="dapAn1"
                                        type="text"
                                        class="form-control"
                                        placeholder="Đáp Án 1"
                                        aria-label="Đáp Án 1"
                                        aria-describedby="input-dapan1"
                                        onChange={this.handlerInputChange}
                                        value={this.state.dapAn1}
                                     />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="input-dapan2">
                                            <div className="custom-control custom-checkbox">
                                                 <input
                                                     type="checkbox"
                                                     className="custom-control-input"
                                                     id="checkDapAn2"
                                                     value={this.state.checkDapAn2}
                                                     onChange={this.handleCheckClick}
                                                     checked={this.state.checkDapAn2}
                                                 />
                                                <label className="custom-control-label" htmlFor="checkDapAn2">Đúng</label>
                                             </div>
                                        </span>
                                    </div>
                                    <textarea
                                        id="dapAn2"
                                        type="text"
                                        class="form-control"
                                        placeholder="Đáp Án 2"
                                        aria-label="Đáp Án 2"
                                        aria-describedby="input-dapan2"
                                        onChange={this.handlerInputChange}
                                        value={this.state.dapAn2}
                                     />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="input-dapan3">
                                            <div className="custom-control custom-checkbox">
                                                 <input
                                                     type="checkbox"
                                                     className="custom-control-input"
                                                     id="checkDapAn3"
                                                     value={this.state.checkDapAn3}
                                                     onChange={this.handleCheckClick}
                                                     checked={this.state.checkDapAn3}
                                                 />
                                                <label className="custom-control-label" htmlFor="checkDapAn3">Đúng</label>
                                             </div>
                                        </span>
                                    </div>
                                    <textarea
                                        id="dapAn3"
                                        type="text"
                                        class="form-control"
                                        placeholder="Đáp Án 3"
                                        aria-label="Đáp Án 3"
                                        aria-describedby="input-dapan3"
                                        onChange={this.handlerInputChange}
                                        value={this.state.dapAn3}
                                     />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="input-dapan4">
                                            <div className="custom-control custom-checkbox">
                                                 <input
                                                     type="checkbox"
                                                     className="custom-control-input"
                                                     id="checkDapAn4"
                                                     value={this.state.checkDapAn4}
                                                     onChange={this.handleCheckClick}
                                                     checked={this.state.checkDapAn4}
                                                 />
                                                <label className="custom-control-label" htmlFor="checkDapAn4">Đúng</label>
                                             </div>
                                        </span>
                                    </div>
                                    <textarea
                                        id="dapAn4"
                                        type="text"
                                        class="form-control"
                                        placeholder="Đáp Án 4"
                                        aria-label="Đáp Án 4"
                                        aria-describedby="input-dapan4"
                                        onChange={this.handlerInputChange}
                                        value={this.state.dapAn4}
                                     />
                                </div>
                            </div>

                        </div>
                        {this.state.actionThem==true && (
                            <Button type="button" onClick={this.handlerAddCauHoi}>Thêm câu hỏi</Button>
                        )}
                        <Button type="submit" color="primary">Thêm bài kiểm tra</Button>
                        {this.state.actionSua==true && (
                            <Button type="button" onClick={this.handlerSuaCauHoi}>Sửa câu hỏi</Button>
                        )}
                        {this.state.actionXoa==true && (
                            <Button type="button" color="red" onClick={this.handlerXoaCauHoi}>Xóa câu hỏi</Button>
                        )}

                    </form>
                </div>
            )
        } else
        return (
            <div>NOT FOUND</div>
        )

    }
}
export default withRouter(BaiKiemTraForm);
