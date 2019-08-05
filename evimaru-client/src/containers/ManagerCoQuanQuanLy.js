import React, {Component} from "react";
import { Switch, Route, withRouter } from "react-router";
import { Animation, Navbar, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse,Container} from "mdbreact";
import ManagerCoQuanQuanLyKhoaHoc from "../components/ManagerCoQuanQuanLyKhoaHoc";
import ManagerCoQuanQuanLyCoSoDaoTao from "../components/ManagerCoQuanQuanLyCoSoDaoTao";
import ManagerCoQuanQuanLyMoLop from "../components/ManagerCoQuanQuanLyMoLop";
import ManagerCoQuanQuanLyKhoaHocCapPhep from "../components/ManagerCoQuanQuanLyKhoaHocCapPhep";
import NoiDungHoc from "../components/NoiDungHoc";
import BaiKiemTraForm from "../components/BaiKiemTraForm";

class ManagerCoQuanQuanLy extends Component{
    constructor(props){
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
        };
        this.onClick = this.onClick.bind(this);
    }
    onClick(){
        this.setState({
            collapse: !this.state.collapse,
        });
    }
    render(){
        const { coSoDaoTaos, nhomKhoaHocs } = this.props;
        // console.log(this.props);
        // <Route
        //     path={`${this.props.match.url}/nhomkhoahoc/:nhomKhoaHocId/khoahoc/:khoaHocId/baikiemtra`}
        //     render={() =>
        //         <BaiKiemTraForm
        //             {...this.props}
        //         />
        //     }
        // />
        // <Route
        //     path={`${this.props.match.url}/nhomkhoahoc/:nhomKhoaHocId/khoahoc/:khoaHocId/noidunghoc`}
        //     render={() =>
        //         <NoiDungHoc
        //             {...this.props}
        //         />
        //     }
        // />
        return(
                <Animation type="p-0">
                    <Navbar className="p-0 m-0" color="#0277bd light-blue darken-2" expand="md" dark>
                        { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                        <Collapse isOpen = { this.state.collapse } navbar>
                            <NavbarNav left>
                                <NavItem>
                                    <NavLink className="nav-link m-0" to={`${this.props.match.url}/csdt`}>Cơ sở đào tạo</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link m-0" to={`${this.props.match.url}/nhomkhoahoc`}>Khóa học</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link m-0" to={`${this.props.match.url}/yeucaumolop`}>Yêu cầu mở lớp</NavLink>
                                </NavItem>

                            </NavbarNav>
                        </Collapse>
                    </Navbar>

                    <div className="my-2 p-0">
                        <div style={{width: "100%"}}>
                            <Switch>
                                <Route
                                    exact
                                    path={`${this.props.match.url}/csdt`}
                                    render={() =>
                                        <ManagerCoQuanQuanLyCoSoDaoTao
                                            {...this.props}
                                        />
                                    }
                                />
                                <Route
                                    exact
                                    path={`${this.props.match.url}/nhomkhoahoc`}
                                    render={() =>
                                        <ManagerCoQuanQuanLyKhoaHoc
                                            nhomKhoaHocs={nhomKhoaHocs}
                                            {...this.props}
                                        />
                                    }
                                />

                                <Route
                                    path={`${this.props.match.url}/nhomkhoahoc/:nhomKhoaHocId/khoahoc/:khoaHocId/capphep`}
                                    render={() =>
                                        <ManagerCoQuanQuanLyKhoaHocCapPhep
                                            {...this.props}
                                        />
                                    }
                                />

                                <Route
                                    path={`${this.props.match.url}/yeucaumolop`}
                                    render={() =>
                                        <ManagerCoQuanQuanLyMoLop />
                                    }
                                />
                            </Switch>

                        </div>
                    </div>
                </Animation>
        )
    }
}

export default withRouter(
    ManagerCoQuanQuanLy
);
