import React, { Component} from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import CoSoDaoTaoContainer from "../containers/CoSoDaoTaoContainer"
import CoSoDaoTao from "../components/CoSoDaoTao";
import KhoaHocHocVienBaiTest from "../components/KhoaHocHocVienBaiTest";
import KhoaHocHocVienBaiKiemTra from "../components/KhoaHocHocVienBaiKiemTra";

import KhoaHocShow from "../containers/KhoaHocShow";
import FindContainer from "../containers/FindContainer";
import { Animation, ListGroup, ListGroupItem, NavLink } from 'mdbreact';

import {JSONisEmpty} from "../services/multifunctional";
import ManagerHocVienKhoaHocContainer from "../containers/ManagerHocVienKhoaHocContainer"
import { fetchGuestCoSoDaoTaos, fetchCurrentUser, postDangKyKhoaHoc, postPassKhoaHoc } from "../store/actions/guest-co-so-dao-tao";
import { fetchBaiHoc } from "../store/actions/bai-hoc";
import { fetchBaiKiemTra } from "../store/actions/bai-kiem-tra";
import { fetchKhoaHoc } from "../store/actions/khoa-hoc";
import { fetchSearchUserByName, fetchSearchKhoaHocByName } from "../store/actions/search";


class Homepage extends Component {
    constructor(props){
        super(props);

    }

    componentDidMount(){
        const { fetchGuestCoSoDaoTaos, fetchCurrentUser, fetchKhoaHoc } = this.props;
        fetchGuestCoSoDaoTaos();
        fetchKhoaHoc();
        if(!JSONisEmpty(this.props.currentUser.user)){
            fetchCurrentUser(this.props.currentUser.user.id);
        }

    }


    render() {
        const { coSoDaoTaos} = this.props.guest;
        const { success, errors, currentUser, khoaHocs } = this.props;
        var coSoDaoTaoListItem;
        if(!JSONisEmpty(coSoDaoTaos)) {
            coSoDaoTaoListItem = coSoDaoTaos.map((csdt, i) => {
                return (
                    <ListGroupItem className="p-0 m-0" key={csdt._id}>
                        <NavLink to={`/csdt/${csdt._id}`}
                            className="light-blue darken-2 w-100 m-0 rounded-0 text-white"
                        >
                            {csdt.name}
                        </NavLink>
                    </ListGroupItem>
                )
            })
        }

        return (
            <div>
                <Animation type="fadeIn">
                    <div className="mt-4">
                        <Switch>

                            <Route
                               exact
                               path="/"
                               render={() => (
                                   <div className="row">
                                       <div className="col-md-3 mb-2">
                                           <ListGroup className="mb-3">
                                               {coSoDaoTaoListItem}
                                           </ListGroup>
                                       </div>
                                       <div className="col-md-9 mb-2">
                                          <FindContainer
                                              {...this.props}
                                          />
                                       </div>
                                   </div>
                               )}
                            />

                            <Route
                                exact
                                path={`/csdt/:csdtId/nhomkhoahoc/:nhomKhoaHocId/khoahoc/:khoaHocId`}
                                render={ () => (
                                  <KhoaHocShow
                                      {...this.props}
                                  />
                                )}
                            />
                            <Route
                                path={`/hocvien/khoahoc/:khoaHocId/content/baitest/:baiKiemTraId`}
                                render={ () => (
                                    <KhoaHocHocVienBaiTest
                                        {...this.props}
                                    />
                                )}
                            />
                            <Route
                                path={`/hocvien/khoahoc/:khoaHocId/content/baikiemtrafinal/:baiKiemTraId`}
                                render={ () => (
                                    <KhoaHocHocVienBaiKiemTra
                                        {...this.props}
                                    />
                                )}
                            />
                            <Route
                                // exact
                                path={`/hocvien/khoahoc/:khoaHocId/`}
                                render={ () => (
                                    <ManagerHocVienKhoaHocContainer
                                        {...this.props}
                                    />
                                )}
                            />


                            <Route
                                path={`/csdt/:csdtId`}
                                render={ () => (
                                  <CoSoDaoTaoContainer {...this.props}/>
                                )}
                            />

                        </Switch>

                    </div>
                </Animation>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        guest: state.guest,
        baiHoc: state.baiHoc,
        baiKiemTra: state.baiKiemTra,
        khoaHocs: state.khoaHocs,
        search: state.search,
        success: state.success,
        errors: state.errors
    };
}


export default withRouter(
    connect(
        mapStateToProps,
        {
            fetchGuestCoSoDaoTaos,
            fetchCurrentUser,
            postDangKyKhoaHoc,
            postPassKhoaHoc,
            fetchBaiHoc,
            fetchBaiKiemTra,
            fetchKhoaHoc,
            fetchSearchUserByName,
            fetchSearchKhoaHocByName
        }
    )(Homepage)
);
