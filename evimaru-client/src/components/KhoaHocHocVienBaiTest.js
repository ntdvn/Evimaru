import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button } from "mdbreact";
import { JSONisEmpty } from "../services/multifunctional";
import Modal from 'react-modal';
import NavbarBackLink from "../components/NavbarBackLink";


const customStyles = {
  content : {
    width                 : '500px',
    height                : '500px',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class KhoaHocHocVienBaiTest extends Component {
    constructor(props){
        super(props);
        this.state = {
            cauHoi: [],
            sttCauHoi: 0,
            dapAn: "",
            giaiThich: "",
            checkChonDapAn: false,
            cauHoiLength: 0,
            ketQua: "",
            ketQuaChu: "",
            modalIsOpen: false,
            error: "",
            success: "",
            last: false,
            radioChecked3: false
        }
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
    // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    // onClick = (cauHoiId, indexCauHoi, cauTraLoiId, indexCauTraLoi) => {
    //     var cauHoi = this.state.cauHoi.map((cauHoi, i) => {
    //         if(cauHoi._id == cauHoiId)
    //         return {
    //             ...cauHoi,
    //             dapAn:cauTraLoiId
    //         }
    //         else return cauHoi
    //     })
    //     // console.log(this.state.cauHoi);
    //     this.setState({cauHoi: cauHoi})
    // }
    onClick = (cauTraLoiId, indexCauTraLoi) => {
        this.setState({dapAn: cauTraLoiId, checkChonDapAn: true})
    }
    handlerNext = () => {
        const { sttCauHoi, cauHoiLength } = this.state;
        if(sttCauHoi<cauHoiLength-1){
            this.setState({
                sttCauHoi: this.state.sttCauHoi+1,
                checkChonDapAn: false,
                error: "",
                success: "",
                giaiThich: ""
            })
        }
        else if(sttCauHoi==cauHoiLength-1){
            this.setState({
                last: true,
            })
        }
    }

    handlerPrevious = () => {
        const { sttCauHoi, cauHoiLength } = this.state;
        if(sttCauHoi>0){
            this.setState({
                sttCauHoi: this.state.sttCauHoi-1,
                error: "",
                success: "",
                giaiThich: "",
                last: false,
            })
        }

        else console.log("stop");
    }
    handlerCheck = (cauHoiId, cauTraLoiId) => {
        const { cauHoi, sttCauHoi, cauHoiLength, dapAn, checkChonDapAn } = this.state;
        // console.log(cauHoi[sttCauHoi]);
        var error, success;
        if(checkChonDapAn==false) {
            error = "Bạn chưa chọn đáp án";
            this.setState({
                error: error,
                success: ""
            })
        } else {
            var check = false;
            cauHoi[sttCauHoi].cauTraLoi.find((ctl, i) => {
                if(ctl.isTrue){
                    if(ctl._id==dapAn) check=true;
                    return ctl;
                }
            })
            console.log(cauHoi[sttCauHoi]);
            if(check==true){
                success = "Đúng!"
                this.setState({
                    success: success,
                    error: "",
                    giaiThich: cauHoi[sttCauHoi].giaiThich
                })
            } else {
                error = "Sai!"
                this.setState({
                    error: error,
                    success: "",
                    giaiThich: cauHoi[sttCauHoi].giaiThich
                })
            }
        }

    }
    handlerEnd = () => {
        this.openModal();
    }

    // handlerClickPost = () => {
    //     var sumTrue=0;
    //
    //     this.state.cauHoi.map((cauHoiState, i) => {
    //
    //         this.props.baiHoc.cauHoi.map((cauHoiProps, i) => {
    //             if(cauHoiState._id===cauHoiProps._id){
    //                 cauHoiProps.cauTraLoi.map((cauTraLoi, i) => {
    //                     if(cauTraLoi.isTrue){
    //                         if(cauTraLoi._id==cauHoiState.dapAn) sumTrue++;
    //                     }
    //                 })
    //             }
    //         })
    //     })
    //
    //     if(sumTrue>this.state.cauHoi.length*6/10){
    //         this.props.postPassKhoaHoc(
    //             this.props.guest.currentUser.user._id,
    //             this.props.match.params.khoaHocId,
    //             this.props.match.params.baiKiemTraId,
    //         )
    //
    //         this.setState({ketQuaChu: "Đạt"})
    //
    //     } else {
    //         this.setState({ketQuaChu: "Chưa đạt"})
    //
    //     }
    //     // console.log(sumTrue);
    //     // console.log(this.props.baiHoc.cauHoi);
    //     // console.log("haha");
    //     var ketQua = `${sumTrue}/${this.state.cauHoi.length}`;
    //     this.setState({ketQua: ketQua})
    //     this.openModal();
    // }

    onClickReload = () => {
        window.location.reload();
        // this.props.history.push(this.props.match.url)
    }

    componentDidMount(){
        this.props.fetchBaiHoc(this.props.match.params.baiKiemTraId)
        .then(() => {
            this.setState({
                cauHoi: this.props.baiHoc.cauHoi,
                cauHoiLength: this.props.baiHoc.cauHoi.length
            })
        })

    }

    render() {
        const { match, baiHoc } = this.props;
        const { cauHoi, sttCauHoi, cauHoiLength, error, success, giaiThich, last } =  this.state;
        var listChonCauHoi, listCauHoi, cauHoiShow, listCauTraLoi;
        // console.log(this.props.match);
        if(!JSONisEmpty(baiHoc) && !JSONisEmpty(cauHoi)){
            // console.log(this.state.cauHoi);
            listChonCauHoi = this.state.cauHoi.map((cauHoi, i) => {
                let classStyle = cauHoi.dapAn=="" ? "chon-cau-hoi-item" : "chon-cau-hoi-item bg-warning"
                return (
                    <div key={i} className={classStyle}>
                        <a className="chon-cau-hoi-text" href={`#cau-hoi-${i+1}`}>{i+1}</a>
                    </div>
                )
            })
            // listCauTraLoi =
            cauHoiShow = cauHoi[sttCauHoi];
            // console.log(cauHoi);
            listCauTraLoi = cauHoi[sttCauHoi].cauTraLoi.map((cauTraLoi, indexCauTraLoi) => (
                <div className="col-md-12">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="input-dapan2">
                                <div class="custom-control custom-radio">
                                  <input
                                      type="radio"
                                      className="custom-control-input"
                                      id={`radio${indexCauTraLoi}`}
                                      name={`radio`}
                                      onClick={this.onClick.bind(this, cauTraLoi._id, indexCauTraLoi)}
                                    />
                                <label className="custom-control-label" htmlFor={`radio${indexCauTraLoi}`}>Chọn</label>
                                </div>
                            </span>
                        </div>
                        <div
                            id="dapAn2"
                            type="text"
                            class="form-control"
                            placeholder="Đáp Án 2"
                            aria-label="Đáp Án 2"
                            aria-describedby="input-dapan2"
                         >{cauTraLoi.noiDung}</div>
                    </div>
                </div>
            ))
            cauHoiShow =
                <div>
                    <h3 id={`cau-hoi`}><strong>Câu {sttCauHoi+1}:</strong> {cauHoi[sttCauHoi].noiDungCauHoi}</h3>
                    <div  className="row mt-3">
                        {listCauTraLoi}
                    </div>
                </div>

            var backLinkArr = [
                {
                    name: "Quản lý",
                    link: `/user/manager/hocvien/khoahoc/`,
                },
                {
                    name: "Quản lý khóa học",
                    link: `/hocvien/khoahoc/${this.props.match.params.khoaHocId}`,
                },
                {
                    name: "Nội dung",
                    link: `/hocvien/khoahoc/${this.props.match.params.khoaHocId}/content`,
                },
                {
                    name: `${baiHoc.tenBaiHoc}`,
                    link: `/hocvien/khoahoc/${this.props.match.params.khoaHocId}/content/baitest/${baiHoc._id}`,
                },
            ]
            return (
                <div>
                    <NavbarBackLink
                        backLinkArr={backLinkArr}
                    />
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                    {cauHoiShow}
                                    {error && (
                                        <div className="alert alert-danger" role="alert">
                                            {error}
                                        </div>
                                    )}
                                    {success && (
                                        <div className="alert alert-success" role="alert">
                                            {success}
                                        </div>
                                    )}
                                    {giaiThich && (
                                        <div className="alert alert-primary" role="alert">
                                            <h3>Giải thích câu hỏi: </h3>
                                            <h2>{giaiThich}</h2>
                                        </div>
                                    )}
                            </div>

                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4">
                                        <Button className="red darken-1 w-100" onClick={this.handlerPrevious}>Câu hỏi trước</Button>
                                    </div>
                                    <div className="col-md-4">
                                        <Button className="light-blue darken-2 w-100" onClick={this.handlerCheck}>Kiểm tra</Button>
                                    </div>
                                    <div className="col-md-4">
                                        <Button className="green darken-1 w-100" onClick={this.handlerNext}>Câu hỏi sau</Button>
                                    </div>
                                    { last  && (
                                        <div className="col-md-12">
                                            <Button className="stylish-color w-100" onClick={this.handlerEnd}>Kết thúc bài test</Button>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        shouldCloseOnOverlayClick={false}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <div className="end-test-container w-100 h-100">
                            <h2>Bạn đã hoàn thành bài test rồi!</h2>
                            <a onClick={this.onClickReload} className="end-test-title">Làm lại bài test</a>
                            <Link to={`/hocvien/khoahoc/${match.params.khoaHocId}/content/`} className="end-test-title">Học tiếp</Link>
                        </div>
                    </Modal>
                </div>
            )

        } else {
            return(
                <div>ERROR</div>
            )
        }
    }
}

export default withRouter(KhoaHocHocVienBaiTest);

// cauHoiShow = baiHoc.cauHoi.map((cauHoi, indexCauHoi) => {
//     let listCauTraLoi = cauHoi.cauTraLoi.map((cauTraLoi, indexCauTraLoi) => (
//         <div className="col-md-12">
//             <div class="input-group mb-3">
//                 <div class="input-group-prepend">
//                     <span class="input-group-text" id="input-dapan2">
//                         <div class="custom-control custom-radio">
//                           <input
//                               type="radio"
//                               className="custom-control-input"
//                               id={`radio${indexCauHoi}${indexCauTraLoi}`}
//                               name={`radio${indexCauHoi}`}
//                               onClick={this.onClick.bind(this, cauHoi._id, indexCauHoi, cauTraLoi._id, indexCauTraLoi)}
//                             />
//                         <label className="custom-control-label" htmlFor={`radio${indexCauHoi}${indexCauTraLoi}`}>Chọn</label>
//                         </div>
//                     </span>
//                 </div>
//                 <div
//                     id="dapAn2"
//                     type="text"
//                     class="form-control"
//                     placeholder="Đáp Án 2"
//                     aria-label="Đáp Án 2"
//                     aria-describedby="input-dapan2"
//                  >{cauTraLoi.noiDung}</div>
//             </div>
//         </div>
//     ))
//     return (
//         <div>
//             <h3 id={`cau-hoi-${indexCauHoi+1}`}><strong>Câu {indexCauHoi+1}:</strong> {cauHoi.noiDungCauHoi}</h3>
//             <div  className="row">
//                 {listCauTraLoi}
//             </div>
//         </div>
//     )
// })
// console.log(this.props);
// <Button onClick={this.handlerClickPost}>Kết thúc bài test</Button>
