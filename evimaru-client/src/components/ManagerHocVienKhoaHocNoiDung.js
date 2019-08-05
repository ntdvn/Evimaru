import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Button, Collapse, MDBIcon } from 'mdbreact';
import ReactPlayer from 'react-player'
import Modal from 'react-modal';

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

class ManagerHocVienKhoaHocNoiDung extends Component {
     constructor(props){
         super(props);
        this.toggle = this.toggle.bind(this);

        this.state = {
            modalIsOpen: false,
            videoBaiHoc: ""
        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
     }
     toggle(i) {
         this.setState({ ["collapse"+i]: !this.state["collapse"+i] });
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
     handlerOpenBaiHocVieo = (videoValue) => {
         this.openModal();
         this.setState({videoBaiHoc: videoValue});
         // console.log(videoValue);
     }

     componentDidMount(){
         this.props.fetchCurrentUser(this.props.currentUser.user.id);
     }

     render() {
         const { khoaHocDangKy, match } = this.props;
         const { khoaHoc } = khoaHocDangKy;
         var listBaiHoc, listBaiKiemTra;
         if(khoaHoc.hasOwnProperty('baiHoc') && khoaHoc.hasOwnProperty('baiKiemTra')){
             const { baiHoc, baiKiemTra } = khoaHoc;
             // console.log(quaTrinhKiemTra);
             // console.log(quaTrinhHoc);
             listBaiHoc = baiHoc.map((baiHoc, i) => {
                 // console.log(baiHoc);
                 // console.log(quaTrinhHoc);
                 let linkBaiGiangList = baiHoc.pdfLinkArr.map((pdf, i) => (
                     <a href={pdf} target="_blank" key={i}>Tài liệu {i+1}</a>
                 ))

                 let videoList = baiHoc.videoLinkArr.map((video, i) => (
                     <div className="video-item"
                         onClick={this.handlerOpenBaiHocVieo.bind(this, video)}
                         key={i}
                     >
                        <MDBIcon icon="play-circle" /> Xem video bài giảng {i+1}
                     </div>
                 ))

                 let cauHoiTest = <Link to={`${match.url}/baitest/${baiHoc._id}`}>Làm bài test</Link>
                 return (
                     <div className="mb-3">
                        <div className="card-header p-3" onClick={this.toggle.bind(this, i)}>
                            <strong>Bài học: </strong>{i+1}
                                <h3>{baiHoc.tenBaiHoc}</h3>

                        </div>
                         <Collapse isOpen={this.state["collapse"+i]}>
                             <div className="card-header">
                                 <div><h4><strong>Tổng quan:</strong></h4> {baiHoc.description}</div>
                                 <div>
                                     <div><h4><strong>Tải bài giảng:</strong></h4></div>
                                     <div>
                                         {linkBaiGiangList}
                                     </div>

                                     <div><h4><strong>Video bài giảng:</strong></h4></div>
                                     <div>
                                         {videoList}
                                     </div>
                                      <div><h4><strong>Làm bài test:</strong></h4>{cauHoiTest}</div>
                                 </div>
                             </div>

                         </Collapse>
                     </div>
                 )
             })

             listBaiKiemTra = baiKiemTra.map((baiKiemTra, i) => {
                 let baiKiemTraLink = <Link to={`${match.url}/baikiemtrafinal/${baiKiemTra._id}`}>Làm bài kiểm tra</Link>
                 return (
                     <div className="mb-3">
                         <div className="card-header p-3" onClick={this.toggle.bind(this, "ha"+i)}>
                             <strong>Bài kiểm tra : </strong>{i+1}
                                 <h3>{baiKiemTra.tenBaiKiemTra}</h3>

                         </div>
                          <Collapse isOpen={this.state["collapse"+"ha"+i]}>
                              <div className="card-header">
                                  <div><h4><strong>Ghi chú:</strong></h4> {baiKiemTra.description}</div>
                                  <div>
                                       <div><h4><strong>Làm bài Kiểm tra:</strong></h4>{baiKiemTraLink}</div>
                                  </div>
                              </div>

                          </Collapse>
                     </div>
                 )
             })
             return(
                 <div className="mt-3">
                     <h2>Bài học:</h2>
                     <div className="">
                         {listBaiHoc}
                     </div>
                     <h2>Bài kiểm tra:</h2>
                     <div className="">
                         {listBaiKiemTra}
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
                             url={this.state.videoBaiHoc}
                             playing
                             controls
                         />
                     </div>
                     </Modal>
                 </div>

             )
         }


         return (
             <div>ERROR</div>
         )
     }
 }

 export default withRouter(ManagerHocVienKhoaHocNoiDung);
