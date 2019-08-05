import React, { Component } from "react";
import ReactPlayer from 'react-player'
import { withRouter } from "react-router-dom";
import { MDBDataTable, MDBIcon, Button } from "mdbreact";
import LopHocItem from "../components/LopHocItem";
import NavbarBackLink from "../components/NavbarBackLink";
import MyDefaultStyleTable from "../components/MyDefaultStyleTable";
import { JSONisEmpty, getIdFromArray } from "../services/multifunctional"
import defaultKhoaHoc from "../images/default_khoaHoc.jpg";
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class KhoaHocShow extends Component {
    constructor() {
    super();

    this.state = {
        modalIsOpen: false
    };
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
    defaultImage(e){
        e.target.src = defaultKhoaHoc
    }
    handlerPostDangKy = (tinhTrang, user, khoaHocId, lopHocId, checkSlot) => {
        console.log(user);
        var giaTriDangKy = ["Chưa mở đăng ký", "Đang mở đăng ký", "Đã đóng đăng ký", "Đang học", "Đã kết thúc"]
        if(user.role.code!=4){
            toast.warn("User này không thể đăng ký học!", {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            switch (tinhTrang) {
                case giaTriDangKy[0]:
                    toast.warn(giaTriDangKy[0], {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    break;
                case giaTriDangKy[1]:
                    if(checkSlot){
                        this.props.postDangKyKhoaHoc(
                            user._id,
                            khoaHocId,
                            lopHocId,
                            {}
                        )
                        .then(() => {
                            this.props.fetchGuestCoSoDaoTaos()
                            this.props.fetchCurrentUser(user._id)
                            toast.success("Đăng ký khóa học thành công", {
                                position: toast.POSITION.TOP_RIGHT
                            });
                        })
                    } else {
                        toast.warn("Lớp đã đạt giới hạn đăng ký!", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                    break;
                case giaTriDangKy[2]:
                    toast.warn(giaTriDangKy[2], {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    break;
                case giaTriDangKy[3]:
                    toast.warn(giaTriDangKy[3], {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    break;
                case giaTriDangKy[4]:
                    toast.warn(giaTriDangKy[4], {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    break;
                default:
            }
        }

    }
    // notify = (s, user) => {
    //
    //     console.log(user.role.code);
    //
    //
    //     // toast("Default Notification !");
    //     //
    //     // toast.success("Success Notification !", {
    //     // position: toast.POSITION.TOP_CENTER
    //     // });
    //     //
    //     // toast.error("Error Notification !", {
    //     // position: toast.POSITION.TOP_LEFT
    //     // });
    //     //
    //     // toast.warn("Warning Notification !", {
    //     // position: toast.POSITION.BOTTOM_LEFT
    //     // });
    //     //
    //     // toast.info("Info Notification !", {
    //     // position: toast.POSITION.BOTTOM_CENTER
    //     // });
    //     //
    //     // toast("Custom Style Notification with css class!", {
    //     // position: toast.POSITION.BOTTOM_RIGHT,
    //     // className: 'foo-bar'
    //     // });
    // };
    render() {
        const { guest, match, success, errors } = this.props;
        const { coSoDaoTaos, currentUser } = guest;
        // console.log(khoaHoc);
        var coSoDaoTao, khoaHoc, nhomKhoaHoc, khoaHocName, khoaHocImageUrl, khoaHocVideoUrl, khoaHocGioiThieu, buttonToClass;
        var whatYouLearnList, requirementsList, descriptionList, forUserList, includeList, lopHocList, backLinkArr;
        var data, lopHocs, table, data;
        if(!JSONisEmpty(coSoDaoTaos)){
            coSoDaoTao = getIdFromArray(match.params.csdtId, coSoDaoTaos);
            // console.log(coSoDaoTao);
            if(coSoDaoTao.hasOwnProperty('nhomKhoaHoc')){
                nhomKhoaHoc = getIdFromArray(match.params.nhomKhoaHocId, coSoDaoTao.nhomKhoaHoc);

                if(nhomKhoaHoc.hasOwnProperty("khoaHoc")){
                    khoaHoc = getIdFromArray(match.params.khoaHocId, nhomKhoaHoc.khoaHoc)
                    khoaHocName = khoaHoc.name;
                    khoaHocGioiThieu = khoaHoc.gioiThieu;
                    khoaHocImageUrl = khoaHoc.imageUrl;
                    khoaHocVideoUrl = khoaHoc.videoUrl;
                    //What you'll learn

                    whatYouLearnList = khoaHoc.whatYouLearnArr.length >0 ?
                        khoaHoc.whatYouLearnArr.map((item, index) => (
                            <div className="col-md-12 mt-2" key={index}>
                                <div className="what-you-learn-container-text">
                                    <MDBIcon icon="thumbs-up" /> {item}
                                </div>
                            </div>
                        )) :
                            <div className="col-md-12 mt-2">
                                <div className="what-you-learn-container-text">
                                    <MDBIcon icon="thumbs-up" /> Đang cập nhật
                                </div>
                            </div>


                    //Requirements

                    requirementsList = khoaHoc.requirementsArr.length >0 ?
                        khoaHoc.requirementsArr.map((item, index) => (
                            <li key={index}>{ item }</li>
                        )) :
                            <li>Đang cập nhật</li>

                    descriptionList = khoaHoc.descriptionArr.length >0 ?
                        khoaHoc.descriptionArr.map((item, index) => (
                            <li key={index}>{ item }</li>
                        )) :
                            <li>Đang cập nhật</li>


                    forUserList = khoaHoc.forUserArr.length >0 ?
                        khoaHoc.forUserArr.map((item, index) => (
                            <li key={index}>{ item }</li>
                        )) :
                            <li>Đang cập nhật</li>

                    includeList = khoaHoc.includeArr.length >0 ?
                        khoaHoc.includeArr.map((item, index) => (
                            <li key={index}>{ item }</li>
                        )) :
                            <li>Đang cập nhật</li>
                    var check = false;
                    if(!JSONisEmpty(currentUser)){
                        if(currentUser.user.hasOwnProperty("khoaHocDangKy")){
                            const { khoaHocDangKy } = currentUser.user;
                            console.log(khoaHocDangKy);
                            khoaHocDangKy.map((khdk, i) => {
                                if(khdk.hasOwnProperty("khoaHoc")){
                                    if (khdk.khoaHoc._id == khoaHoc._id) check = true;
                                }
                            })
                                if(check==false){

                                    if(khoaHoc.hasOwnProperty("lopHoc")){
                                        // lopHocList = khoaHoc.lopHoc.map((lopHoc, i) => {
                                        //     return (
                                        //         <LopHocItem
                                        //             key={lopHoc._id}
                                        //             lopHoc={lopHoc}
                                        //         />
                                        //     )
                                        // })
                                        lopHocs = khoaHoc.lopHoc.map((lopHoc, i) => {
                                            let ngayBatDau, ngayKetThuc;
                                            ngayBatDau = new Date(lopHoc.thoiGian.ngayBatDau);
                                            ngayKetThuc = new Date(lopHoc.thoiGian.ngayKetThuc);
                                            let buoiHoc = lopHoc.thoiGian.buoiHoc.map((buoiHoc, i) => {
                                                return <div>{i+1} . {buoiHoc.ngayHoc} - {buoiHoc.gioHoc}</div>
                                            })
                                            var checkSlot = lopHoc.danhSachHocVien.length/lopHoc.gioiHanHocVien < 1;
                                            console.log(checkSlot);
                                            let dangKy = <Button className="w-100" onClick={this.handlerPostDangKy.bind(this, currentUser.user._id,khoaHoc._id, lopHoc._id)}>Đăng ký học</Button>
                                            var giaTriDangKy = ["Chưa mở đăng ký", "Đang mở đăng ký", "Đã đóng đăng ký", "Đang học", "Đã kết thúc"]
                                            dangKy = <Button className="w-100" onClick={this.handlerPostDangKy.bind(this, lopHoc.tinhTrang, currentUser.user,khoaHoc._id, lopHoc._id, checkSlot)}>Đăng ký</Button>

                                            // switch (lopHoc.tinhTrang) {
                                            //     case giaTriDangKy[0]:
                                            //         dangKy = <Button className="w-100" onClick={this.notify.bind(this, giaTriDangKy[0], currentUser.user)}>Đăng ký</Button>
                                            //         break;
                                            //     case giaTriDangKy[1]:
                                            //         dangKy = <Button className="w-100" onClick={this.handlerPostDangKy.bind(this, currentUser.user._id,khoaHoc._id, lopHoc._id, checkSlot)}>Đăng ký</Button>
                                            //         break;
                                            //     case giaTriDangKy[2]:
                                            //         dangKy = <Button className="w-100" onClick={this.notify.bind(this, giaTriDangKy[2], currentUser.user)} >Đăng ký</Button>
                                            //         break;
                                            //     case giaTriDangKy[3]:
                                            //         dangKy = <Button className="w-100" onClick={this.notify.bind(this, giaTriDangKy[3], currentUser.user)} >Đăng ký</Button>
                                            //         break;
                                            //     case giaTriDangKy[4]:
                                            //         dangKy = <Button className="w-100" onClick={this.notify.bind(this, giaTriDangKy[4], currentUser.user)} >Đăng ký</Button>
                                            //         break;
                                            //     default:
                                            //
                                            // }

                                            return {
                                                tenLop: lopHoc.tenLop,

                                                ngayBatDau: ngayBatDau.toLocaleDateString('en-GB'),
                                                ngayKetThuc: ngayKetThuc.toLocaleDateString('en-GB'),
                                                siSo: lopHoc.gioiHanHocVien,
                                                daDangKy: lopHoc.danhSachHocVien.length,
                                                tinhTrang: lopHoc.tinhTrang,
                                                // buoiHoc: buoiHoc,
                                                dangKy: dangKy
                                            }
                                        })

                                        data = {
                                            columns: [
                                                {
                                                    label: "Tên lớp",
                                                    field: "tenLop",
                                                    width: 5
                                                },
                                                {
                                                    label: "Ngày bắt đầu",
                                                    field: "ngayBatDau",
                                                    width: 5
                                                },
                                                {
                                                    label: "Ngày kết thúc",
                                                    field: "ngayKetThuc",
                                                    width: 5
                                                },
                                                {
                                                    label: "Tình trạng",
                                                    field: "tinhTrang",
                                                    width: 5
                                                },
                                                {
                                                    label: "Sĩ số",
                                                    field: "siSo",
                                                    width: 5
                                                },
                                                {
                                                    label: "Đã ĐK",
                                                    field: "daDangKy",
                                                    width: 5
                                                },

                                                {
                                                    label: "Đăng ký",
                                                    field: "dangKy",
                                                    width: 5
                                                },

                                            ],
                                            rows: lopHocs
                                        }


                                        table = <div className="mt-3 text-wrap">
                                            <MDBDataTable
                                                reponsive="true"
                                                bordered
                                                hover
                                                data={data}
                                            />
                                        </div>

                                        buttonToClass = <Button href="#list-lop-hoc" color="red">Xem danh sách lớp</Button>
                                    }
                            } else {
                                buttonToClass = <Button href="#list-lop-hoc" color="grey">Đang học</Button>
                            }
                        }
                    }




                    // console.log(check);



                    backLinkArr = [
                        {
                            name: `${coSoDaoTao.name}`,
                            link: `/csdt/${coSoDaoTao._id}`,
                        },
                        {
                            name: `${nhomKhoaHoc.name} - Khóa học`,
                            link: `/csdt/${coSoDaoTao._id}/nhomkhoahoc/${nhomKhoaHoc._id}`,
                        },
                        {
                            name: khoaHoc.name,
                            link: `/csdt/${coSoDaoTao._id}/nhomkhoahoc/${nhomKhoaHoc._id}/khoahoc/${khoaHoc._id}`,
                        },
                    ]

                }
            }


        }
        if(JSONisEmpty(coSoDaoTaos)) return (
            <div>ERROR</div>
        )



        return(
            <div>
                <NavbarBackLink
                    backLinkArr={backLinkArr}
                />
            <div className="jumbotron p-4 stylish-color text-white">
                    <div className="row">
                        <div className="col-md-7">
                            <h1 className=" font-weight-bold">Hello, world!</h1>
                            <h4>{khoaHocGioiThieu}</h4>
                            <hr className="style-one"/>
                            <div>Khoá học tạo bởi Đạt</div>
                            <div>Last Update: 13-3-2018</div>

                        </div>

                        <div className="col-md-5">
                            <div className="video-intro">
                                <img
                                    src={khoaHocImageUrl||defaultKhoaHoc}
                                    alt="Image not found"
                                    onError={this.defaultImage}
                                    className="img-thumbnail img-fluid video-intro-img"
                                    style={{width: "100%", height: "100%"}}
                                />
                                <div className="video-intro-icon" onClick={this.openModal}><MDBIcon icon="play-circle"/></div>
                                <div className="video-intro-text">Giới thiệu qua về khóa học</div>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">

                            <div className="container-fluid what-you-learn-container mb-3">
                                <h3>What you'll learn</h3>
                                <div className="row">
                                    { whatYouLearnList }
                                </div>
                            </div>

                            <div className="container-fluid what-you-learn-container mb-3">
                                <h3>Requirements</h3>
                                <ul>
                                    { requirementsList }
                                </ul>
                            </div>

                            <div className="container-fluid what-you-learn-container mb-3">
                                <h3>Description</h3>
                                <ul>
                                    { descriptionList }
                                </ul>
                            </div>

                            <div className="container-fluid what-you-learn-container mb-3">
                                <h3>Who this course is for:</h3>
                                <ul>
                                    { forUserList }
                                </ul>
                            </div>

                        </div>
                        <div className="col-md-4 ">
                            <div className="card p-4">
                                <h2>Bao gồm</h2>
                                <ul>
                                    { includeList }
                                </ul>
                                { buttonToClass }

                            </div>
                            <div className="mt-3">
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
                        </div>
                    </div>
                    <div id="list-lop-hoc" className="mb-3">
                        {table}
                    </div>

                </div>
                <div>
                    <ToastContainer />
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                <div className="player-wrapper" style={{minWidth:"800px", minHeight: "500px"}}>
                    <ReactPlayer
                        className='react-player'
                        width='100%'
                        height='100%'
                        url={`${khoaHocVideoUrl}`}
                        playing
                        controls
                    />
                </div>
                </Modal>
            </div>

        )
    }
}

export default withRouter(KhoaHocShow);
