import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button } from "mdbreact";
import { JSONisEmpty } from "../services/multifunctional";
import NavbarBackLink from "../components/NavbarBackLink";
import Modal from 'react-modal';
import ResultPDF from "../components/defaultPDFfile";

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

class KhoaHocHocVienBaiKiemTra extends Component {
    constructor(props){
        super(props);
        this.state = {
            cauHoi: [],
            ketQua: "",
            ketQuaChu: "",
            modalIsOpen: false
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

    onClick = (cauHoiId, indexCauHoi, cauTraLoiId, indexCauTraLoi, noiDungDapAn) => {
        var cauHoi = this.state.cauHoi.map((cauHoi, i) => {
            if(cauHoi._id == cauHoiId)
            return {
                ...cauHoi,
                dapAn:cauTraLoiId,
                noiDungDapAn: noiDungDapAn
            }
            else return cauHoi
        })
        // console.log(this.state.cauHoi);
        this.setState({cauHoi: cauHoi})
    }

    handlerClickPost = () => {
        var sumTrue=0;
        var hocOnline = false;
        var cauHoi = this.state.cauHoi.map((cauHoiState, indexCauHoiState) => {
            let sttCauHoi, isTrue, dapAn, cauHoi;
            isTrue = "Sai";
            dapAn = "Trống";
            sttCauHoi = indexCauHoiState+1;
            this.props.baiKiemTra.cauHoi.map((cauHoiProps, indexCauHoiProps) => {
                if(cauHoiState._id===cauHoiProps._id){
                    cauHoiProps.cauTraLoi.map((cauTraLoi, indexDapAn) => {
                        cauHoi = cauHoiProps;
                        dapAn = cauHoiState.dapAn!=""?cauHoiState.dapAn:"Chưa chọn đáp án";
                        console.log(cauHoiState.dapAn);

                        if(cauTraLoi.isTrue){
                            if(cauTraLoi._id==cauHoiState.dapAn){
                                sumTrue++;
                                isTrue = "Đúng";
                                dapAn = cauHoiState.dapAn;
                            }
                        }
                        // console.log(cauHoiState);
                    })
                }
            })
            return { cauHoi: cauHoi, dapAn: dapAn, isTrue: isTrue };
        })
        // console.log(cauHoi);
        this.setState({cauHoi: cauHoi})


        if(sumTrue>this.state.cauHoi.length*6/10){
            hocOnline = true;

            this.setState({ketQuaChu: "Đạt"})

        } else {
            this.setState({ketQuaChu: "Chưa đạt"})

        }

        this.props.postPassKhoaHoc(
            this.props.guest.currentUser.user._id,
            this.props.match.params.khoaHocId,
            this.props.match.params.baiKiemTraId,
            {
                ketQuaHocOnline: {
                    soCauTraLoiDung: sumTrue,
                    chiTiet: cauHoi
                },
                hocOnline: hocOnline
            }


        )

        // console.log(sumTrue);
        // console.log(this.props.baiHoc.cauHoi);
        // console.log("haha");
        var ketQua = `${sumTrue}/${this.state.cauHoi.length}`;
        this.setState({ketQua: ketQua})
        this.openModal();
    }

    onClickReload = () => {
        window.location.reload();
        // this.props.history.push(this.props.match.url)
    }

    componentDidMount(){
        this.props.fetchBaiKiemTra(this.props.match.params.baiKiemTraId)
        .then(() => {
            var cauHoi = this.props.baiKiemTra.cauHoi.map((cauHoi, i) => {
                return {
                    _id: cauHoi._id,
                    dapAn: ""
                }
            })
            this.setState({cauHoi: cauHoi})
        })

    }

    render() {
        const { guest, match, baiKiemTra} = this.props;
        const { ketQua, ketQuaChu, cauHoi } = this.state;
        var listChonCauHoi, listCauHoi, btnXemKetQua;
        // console.log(this.state.cauHoi);
        if(!JSONisEmpty(baiKiemTra) && !JSONisEmpty(guest)){
            const { currentUser } = guest;
            // console.log(baiKiemTra);
            listChonCauHoi = this.state.cauHoi.map((cauHoi, i) => {
                let classStyle = cauHoi.dapAn=="" ? "chon-cau-hoi-item" : "chon-cau-hoi-item bg-warning"
                return (
                    <div key={i} className={classStyle}>
                        <a className="chon-cau-hoi-text" href={`#cau-hoi-${i+1}`}>{i+1}</a>
                    </div>
                )
            })
            listCauHoi = baiKiemTra.cauHoi.map((cauHoi, indexCauHoi) => {
                let listCauTraLoi = cauHoi.cauTraLoi.map((cauTraLoi, indexCauTraLoi) => (
                    <div className="col-md-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="input-dapan2">
                                    <div class="custom-control custom-radio">
                                      <input
                                          type="radio"
                                          className="custom-control-input"
                                          id={`radio${indexCauHoi}${indexCauTraLoi}`}
                                          name={`radio${indexCauHoi}`}
                                          onClick={this.onClick.bind(this, cauHoi._id, indexCauHoi, cauTraLoi._id, indexCauTraLoi, cauTraLoi.noiDung)}
                                        />
                                    <label className="custom-control-label" htmlFor={`radio${indexCauHoi}${indexCauTraLoi}`}>Chọn</label>
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
                return (
                    <div>
                        <h3 id={`cau-hoi-${indexCauHoi+1}`}><strong>Câu {indexCauHoi+1}:</strong> {cauHoi.noiDungCauHoi}</h3>
                        <div  className="row">
                            {listCauTraLoi}
                        </div>
                    </div>
                )
            })
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
                    name: `${baiKiemTra.tenBaiKiemTra}`,
                    link: `/hocvien/khoahoc/${this.props.match.params.khoaHocId}/content/baikiemtrafinal/${baiKiemTra._id}`,
                },

            ]
            if(!JSONisEmpty(currentUser)){
                const { user } = currentUser
                // console.log(baiKiemTra.KhoaHocCapPhep);
                var khoaHocDangKy = user.khoaHocDangKy.find(khdk => khdk.khoaHoc._id == baiKiemTra.khoaHocCapPhep._id);
                // console.log(khoaHocDangKy);
                var time = new Date().toLocaleTimeString("en-GB");
                // console.log(currentUser.user.userInformation.hoTen);
                // console.log(ketQuaChu);
                console.log(ketQua);
                khoaHocDangKy = {
                    ...khoaHocDangKy,

                }
                btnXemKetQua =
                    <ResultPDF
                        data={cauHoi}
                        time={time}
                        userInformation={currentUser.user.userInformation}
                        khoaHocDangKy={khoaHocDangKy}
                        ketLuan={ketQuaChu}
                        ketQua={ketQua}
                    />;
            }

            return (
                <div>
                    <NavbarBackLink
                        backLinkArr={backLinkArr}
                    />
                <div className="row mt-2">
                        <div className="col-md-4">
                            <div className="chon-cau-hoi-container">
                                {listChonCauHoi}
                            </div>
                            <Button onClick={this.handlerClickPost}>Kết thúc bài test</Button>
                            <div></div>
                        </div>
                        <div className="col-md-8">
                            <div>
                                {listCauHoi}
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
                            <div className="end-test-title">Bạn làm được: </div>
                            <div className="end-test-result">{this.state.ketQua}</div>
                            <div className="end-test-result">Kết quả: {this.state.ketQuaChu}</div>
                            {btnXemKetQua}
                            <a onClick={this.onClickReload} className="end-test-title">Làm lại bài kiểm tra</a>
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

export default withRouter(KhoaHocHocVienBaiKiemTra);
