import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Input, Button } from "mdbreact";
import NavbarBackLink from "../components/NavbarBackLink";
import { JSONisEmpty, getIdFromArray } from "../services/multifunctional";

class ManagerCoSoDaoTaoKhoaHocAddTest extends Component {
    constructor(props){
        super(props);
        this.state = {
            tenBaiKiemTra: "",
            description: "",
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
            checkPostBaiKiemTra: []
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
        // console.log(this.state.buttonDaChon);
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

    handlerPostBaiKiemTra = id => {
        console.log(id);
        let { tenBaiKiemTra, description, cauHoi } = this.state;
        let errorArr,arrayResult=[];
        let checkError = false;
        errorArr = [
            "Bạn phải nhập tên bài kiểm tra",
            "Bạn phải thêm câu hỏi vào bài kiểm tra"
        ];

        if(tenBaiKiemTra==""){
           if(!arrayResult.includes(errorArr[0])){
               arrayResult=[...arrayResult, errorArr[0]];
               checkError=true;
           }
        }

       if(cauHoi.length==0){
           if(!arrayResult.includes(errorArr[1])){
               arrayResult=[...arrayResult, errorArr[1]];
               checkError=true;
           }
       }

       this.setState({checkPostBaiKiemTra: arrayResult})

       if(checkError==false){
           this.props.postBaiKiemTra(
               id,
               {
                   tenBaiKiemTra: tenBaiKiemTra,
                   description: description,
                   cauHoi: cauHoi,
               }
           )
       }

       setTimeout((() => {
           this.setState({ checkPostBaiHoc: []})
       }).bind(this), 3000);
    }

    render() {
        const { nhomKhoaHoc, khoaHoc, coSoDaoTao, success, errors, match } = this.props;
        const { pdfLink, pdfLinkArr, videoLink, videoLinkArr, checkPostBaiKiemTra } = this.state;
        var listCauHoi;
        if(!JSONisEmpty(khoaHoc)){
            listCauHoi = this.state.cauHoi.map((cauHoi, i) => (
                <Button onClick={this.handlerOnclickCauHoi.bind(this, i)} key={i}>{i+1}</Button>
            ))
            var backLinkArr = [
                {
                    name: `${nhomKhoaHoc.name}`,
                    link: `/user/manager/nhomkhoahoc/${nhomKhoaHoc._id}`,
                },
                {
                    name: "Thông tin",
                    link: `/user/manager/nhomkhoahoc/${nhomKhoaHoc._id}/khoahoc/${khoaHoc._id}/information`,
                },
                {
                    name: "Bài kiểm tra",
                    link: `/user/manager/nhomkhoahoc/${nhomKhoaHoc._id}/khoahoc/${khoaHoc._id}/information/test`,
                },
                {
                    name: "Thêm bài kiểm tra",
                    link: `/user/manager/nhomkhoahoc/${nhomKhoaHoc._id}/khoahoc/${khoaHoc._id}/information/test/add`,
                },
            ]

            var listError, errorPanel;
            listError = checkPostBaiKiemTra.map((error, i) => (
                <div><strong>!</strong> {error}</div>
            ))
            errorPanel = listError.length!=0?
            <div className="alert alert-danger" role="alert">
                {listError}
            </div>: <div></div>

            return(
                <div>
                    <NavbarBackLink
                        backLinkArr={backLinkArr}
                    />
                    <h3>KHÓA HỌC: {khoaHoc.name}</h3>
                        <div>{this.state.loi}</div>

                            <div className="container-fluid what-you-learn-container mb-3">
                                <h3>Tên bài kiểm tra</h3>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="col-md-12">
                                            <Input
                                                label="Tên bài kiểm tra"
                                                id="tenBaiKiemTra"
                                                type="textarea"
                                                onChange={this.handlerInputChange}
                                                value={this.state.tenBaiKiemTra}
                                                rows="4"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="container-fluid what-you-learn-container mb-3">
                                <h3>Ghi chú bài kiểm tra</h3>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="col-md-12">
                                            <Input
                                                label="Ghi chú về bài kiểm tra"
                                                id="description"
                                                type="textarea"
                                                onChange={this.handlerInputChange}
                                                value={this.state.description}
                                                rows="4"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        <div className="container-fluid what-you-learn-container mb-3">
                            <h3>Câu hỏi kiểm tra</h3>
                            <div>{this.state.loi}</div>
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

                            {this.state.actionSua==true && (
                                <Button type="button" onClick={this.handlerSuaCauHoi}>Sửa câu hỏi</Button>
                            )}
                            {this.state.actionXoa==true && (
                                <Button type="button" color="red" onClick={this.handlerXoaCauHoi}>Xóa câu hỏi</Button>
                            )}
                            </div>
                            { errorPanel }
                        <Button
                            type="submit"
                            color="primary"
                            onClick={this.handlerPostBaiKiemTra.bind(this, khoaHoc._id)}
                        >
                            Thêm bài kiểm tra
                        </Button>
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
                </div>
            )
        } else {
            return <div>ERROR</div>
        }
    }
}

export default withRouter(ManagerCoSoDaoTaoKhoaHocAddTest);
