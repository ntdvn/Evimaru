import React, { Component } from "react";
import { withRouter, Link, Switch, Route } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { MDBIcon, Button } from "mdbreact";
import "react-tabs/style/react-tabs.css";
import defaultKhoaHoc from "../images/default_khoaHoc.jpg";
import ManagerHocVienKhoaHocNoiDung from "../components/ManagerHocVienKhoaHocNoiDung";
import NavbarBackLink from "../components/NavbarBackLink";
import { JSONisEmpty } from "../services/multifunctional"

class ManagerHocVienKhoaHocContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            tabSelected: "",
        }
    }
    handlerChooseTab = (value) => {
        this.setState({tabSelected: value});
    }
    render() {
        const { guest, match, imageUrl } = this.props;
        var tabMenu, tabsInformation, hocOnline, hocTrenLop;

        if(!JSONisEmpty(guest)){


            const { coSoDaoTaos, currentUser } = guest;
            var khoaHocDangHocList;
            if(guest.hasOwnProperty('coSoDaoTaos') && guest.hasOwnProperty('currentUser')){
                var khoaHocDangKy = currentUser.user.khoaHocDangKy.find(khdk => khdk.khoaHoc._id==match.params.khoaHocId);
                var { khoaHoc, lopHoc, quaTrinhHoc } = khoaHocDangKy;
                if(khoaHocDangKy.hocOnline || khoaHocDangKy.hocKhongOnline){
                    hocOnline = <Button className="green darken-1 p-1">Đã hoàn thành</Button>
                } else {
                    hocOnline = <Button className="lime darken-3 p-1">Chưa hoàn thành</Button>
                }

                if(khoaHocDangKy.hocTrenLop){
                    hocTrenLop = <Button className="green darken-1 p-1">Đã hoàn thành</Button>
                } else {
                    hocTrenLop = <Button className="lime darken-3 p-1">Chưa hoàn thành</Button>
                }

                tabsInformation = [
                    {
                         name: "Hoạt động gần đây",
                         link: `${match.url}/activity`
                    },
                    {
                         name: "Nội dung khóa học",
                         link: `${match.url}/content`
                    },
                    {
                         name: "Câu hỏi thường gặp",
                         link: `${match.url}/question`
                    },
                    {
                         name: "Thông báo",
                         link: `${match.url}/notification`
                    }
                ];

                tabMenu = tabsInformation.map((infor, i) => {
                    let classValue;
                    if(this.state.tabSelected != i) classValue="tab-menu-item text-dark";
                    else classValue="tab-menu-item tab-menu-item-active text-black";
                    return (
                        <Link
                            className={classValue}
                            to={infor.link}
                            onClick={this.handlerChooseTab.bind(this, i)}
                        >
                            {infor.name}
                        </Link>
                    )
                })
                // console.log(khoaHocDangKy);
                var backLinkArr = [
                    {
                        name: `Khóa học`,
                        link: `/user/manager/khoahoc/`,
                    },
                    {
                        name: `${khoaHocDangKy.khoaHoc.name}`,
                        link: `/user/manager/nhomkhoahoc/`,
                    },
                ]


                // console.log(quaTrinhHoc);
                console.log(khoaHoc);
                return (
                    <div className="mt-2" >
                        <NavbarBackLink
                            backLinkArr={backLinkArr}
                        />
                        <div class="jumbotron m-0 p-4 stylish-color text-white">
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="video-intro">
                                            <img
                                                src={khoaHoc.imageUrl||defaultKhoaHoc}
                                                alt="Image not found"
                                                onError={this.defaultImage}
                                                className="img-thumbnail img-fluid video-intro-img"
                                                style={{width: "100%", height: "100%"}}
                                            />
                                            <div className="video-intro-icon"><MDBIcon icon="play-circle"/></div>
                                            <div className="video-intro-text">Giới thiệu qua về khóa học</div>
                                        </div>

                                    </div>
                                    <div className="col-md-7">
                                        <h1 className=" font-weight-bold">{khoaHoc.name}!</h1>
                                        <h4>{khoaHoc.gioiThieu}</h4>
                                        <hr className="style-one"/>
                                        <div><strong>Học tại: </strong>{khoaHoc.coSoDaoTao.name}</div>
                                        <div><strong>Lớp: </strong>{lopHoc.tenLop}</div>
                                        <h3><strong>Tình trạng: </strong></h3>
                                        <div className="d-flex flex-columns">
                                            <div>Học Online: {hocOnline}</div>
                                            <div>Học trên lớp: {hocTrenLop}</div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div className="tab-menu grey lighten-4">
                            {tabMenu}
                        </div>
                        <div>
                            <Switch>

                                <Route
                                    path={`${match.url}/activity`}
                                    render={() =>
                                        <div></div>
                                    }
                                />
                                <Route
                                    path={`${match.url}/content`}
                                    render={() =>
                                        <ManagerHocVienKhoaHocNoiDung
                                            khoaHocDangKy={khoaHocDangKy}
                                            {...this.props}
                                        />
                                    }
                                />
                            </Switch>
                        </div>
                    </div>
                )
            }
        }
        return (
            <div>
                ERROR
            </div>
        )


    }
}
export default withRouter(ManagerHocVienKhoaHocContainer);
