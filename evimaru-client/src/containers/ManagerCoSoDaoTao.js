import React, {Component} from "react";
import { Switch, Route } from "react-router";

import { Animation, Navbar, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse,Container, DropdownItem, Dropdown, DropdownToggle, DropdownMenu} from "mdbreact";
import ManagerCoQuanQuanLyKhoaHoc from "../components/ManagerCoQuanQuanLyKhoaHoc";
import ManagerCoQuanQuanLyCoSoDaoTao from "../components/ManagerCoQuanQuanLyCoSoDaoTao";
import ManagerCoQuanQuanLyMoLop from "../components/ManagerCoQuanQuanLyMoLop";
import ManagerCoSoDaoTaoCoSoVatChat from "../components/ManagerCoSoDaoTaoCoSoVatChat";
import ManagerCoSoDaoTaoGiangVien from "../components/ManagerCoSoDaoTaoGiangVien";
import ManagerCoSoDaoTaoKhoaHoc from "../components/ManagerCoSoDaoTaoKhoaHoc";
import ManagerCoSoDaoTaoMoLop from "../components/ManagerCoSoDaoTaoMoLop";
import ManagerCoSoDaoTaoTaiLieu from "../components/ManagerCoSoDaoTaoTaiLieu";
import ManagerCoSoDaoTaoLienHe from "../components/ManagerCoSoDaoTaoLienHe";
import ManagerCoSoDaoTaoKhoaHocInformationContainer from "../containers/ManagerCoSoDaoTaoKhoaHocInformationContainer";


import { JSONisEmpty } from "../services/multifunctional";


class ManagerCoSoDaoTao extends Component{
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
        const { coSoDaoTao, match } = this.props;
        var nhomKhoaHocDropDown, nhomKhoaHocDropDownItem, nhomKhoaHocTaiLieuDropDownItem;
        // console.log(this.props);
        if(!JSONisEmpty(coSoDaoTao)){
            nhomKhoaHocDropDownItem = coSoDaoTao.nhomKhoaHoc.map((nhomKhoaHoc, i) => {
                return (
                    <DropdownItem className="py-0 m-0" key={nhomKhoaHoc._id}>
                        <NavLink className="nav-link m-0 text-dark m-0" to={`${this.props.match.url}/nhomkhoahoc/${nhomKhoaHoc._id}`}>{nhomKhoaHoc.name}</NavLink>
                    </DropdownItem>
                )
            })

            nhomKhoaHocTaiLieuDropDownItem = coSoDaoTao.nhomKhoaHoc.map((nhomKhoaHoc, i) => {
                return (
                    <DropdownItem className="py-0 m-0" key={nhomKhoaHoc._id}>
                        <NavLink className="nav-link m-0 text-dark m-0" to={`${this.props.match.url}/tailieu/nhomkhoahoc/${nhomKhoaHoc._id}`}>{nhomKhoaHoc.name}</NavLink>
                    </DropdownItem>
                )
            })
        }
        // <Route
        //     path={`${this.props.match.url}/nhomkhoahoc/:nhomKhoaHocId/khoaHoc/:khoaHocId`}
        //     render={() =>
        //         <ManagerCoSoDaoTaoMoLop
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
                                        <NavLink className="nav-link m-0" to={`${this.props.match.url}/csvc`}>Cơ sở vật chất</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link m-0" to={`${this.props.match.url}/giangvien`}>Giảng viên</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <Dropdown>
                                           <DropdownToggle nav caret>
                                               <div className="d-sm-inline">Khóa học</div>
                                           </DropdownToggle>
                                           <DropdownMenu >
                                               <DropdownItem className="py-0 m-0">
                                               </DropdownItem>
                                               {nhomKhoaHocDropDownItem}
                                           </DropdownMenu>
                                       </Dropdown>
                                    </NavItem>

                                    <NavItem>
                                        <Dropdown>
                                           <DropdownToggle nav caret>
                                               <div className="d-sm-inline">Tài liệu</div>
                                           </DropdownToggle>
                                           <DropdownMenu >
                                               <DropdownItem className="py-0 m-0">
                                               </DropdownItem>
                                               {nhomKhoaHocTaiLieuDropDownItem}
                                           </DropdownMenu>
                                       </Dropdown>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link m-0" to={`${this.props.match.url}/lienhe`}>Liên hệ</NavLink>
                                    </NavItem>

                                </NavbarNav>
                            </Collapse>
                        </Navbar>

                        <div className="my-2 p-0">
                            <div style={{width: "100%"}}>
                                <Switch>
                                    <Route
                                        exact
                                        path={`${this.props.match.url}/csvc`}
                                        render={() =>
                                            <ManagerCoSoDaoTaoCoSoVatChat
                                                {...this.props}
                                            />
                                        }
                                    />
                                    <Route
                                        path={`${this.props.match.url}/giangvien`}
                                        render={() =>
                                            <ManagerCoSoDaoTaoGiangVien
                                                {...this.props}
                                            />
                                        }
                                    />

                                    <Route
                                        exact
                                        path={`${this.props.match.url}/nhomkhoahoc/:nhomKhoaHocId`}
                                        render={() =>
                                            <ManagerCoSoDaoTaoKhoaHoc
                                                {...this.props}
                                            />
                                        }
                                    />
                                    <Route
                                        path={`${this.props.match.url}/nhomkhoahoc/:nhomKhoaHocId/khoaHoc/:khoaHocId/information`}
                                        render={() =>
                                            <ManagerCoSoDaoTaoKhoaHocInformationContainer
                                                {...this.props}
                                            />
                                        }
                                    />

                                    <Route
                                        path={`${this.props.match.url}/tailieu/nhomkhoahoc/:nhomKhoaHocId`}
                                        render={() =>
                                            <ManagerCoSoDaoTaoTaiLieu
                                                {...this.props}
                                            />
                                        }
                                    />
                                    <Route
                                        path={`${this.props.match.url}/lienhe/`}
                                        render={() =>
                                            <ManagerCoSoDaoTaoLienHe
                                                {...this.props}
                                            />
                                        }
                                    />

                                </Switch>

                            </div>
                        </div>
                    </Animation>
        )
    }
}


export default ManagerCoSoDaoTao;
