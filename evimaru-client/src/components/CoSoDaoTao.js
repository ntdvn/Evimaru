import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { Animation, Navbar, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse,Container,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "mdbreact";
import CoSoVatChat from "./CoSoVatChat";
import GiangVien from "./GiangVien";
import KhoaHoc from "./KhoaHoc";
import TaiLieu from "./TaiLieu";

import {JSONisEmpty} from "../services/multifunctional";
class CoSoDaoTao extends Component{
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
    render() {
        const { match } = this.props;
        const { coSoDaoTaos } = this.props.guest;
        var coSoDaoTao, nhomKhoaHocDropDown, nhomKhoaHocDropDownItem, nhomTaiLieuDropDownItem;
        if(!JSONisEmpty(coSoDaoTaos)){
            coSoDaoTao = coSoDaoTaos.find(csdt => csdt._id === match.params.csdtId);
            // console.log(coSoDaoTao);
            nhomKhoaHocDropDownItem = coSoDaoTao.nhomKhoaHoc.map((nhomKhoaHoc, i) => {
                return (
                    <DropdownItem className="py-0 m-0" key={nhomKhoaHoc._id}>
                        <NavLink className="nav-link m-0 text-dark m-0" to={`${this.props.match.url}/nhomkhoahoc/${nhomKhoaHoc._id}`}>{nhomKhoaHoc.name}</NavLink>
                    </DropdownItem>
                )
            })

            nhomTaiLieuDropDownItem = coSoDaoTao.nhomKhoaHoc.map((nhomKhoaHoc, i) => {
                return (
                    <DropdownItem className="py-0 m-0" key={nhomKhoaHoc._id}>
                        <NavLink className="nav-link m-0 text-dark m-0" to={`${this.props.match.url}/tailieu/nhomkhoahoc/${nhomKhoaHoc._id}`}>{nhomKhoaHoc.name}</NavLink>
                    </DropdownItem>
                )
            })

            // nhomKhoaHocDropDown =

        }
        // console.log(this.props.match.url);
        return (
                <div>
                    <Navbar className="m-0 p-0" color="#0277bd light-blue darken-2" expand="md" dark>
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
                                           {nhomTaiLieuDropDownItem}
                                       </DropdownMenu>
                                   </Dropdown>
                                </NavItem>


                            </NavbarNav>
                        </Collapse>
                    </Navbar>

                    <div className="my-2">
                        <div>
                            <Route
                               path={`${this.props.match.url}/csvc`}
                               render={() => (
                                   <CoSoVatChat
                                       coSoDaoTao={coSoDaoTao}
                                   />
                               )}
                            />
                            <Route
                                path={`${this.props.match.url}/giangvien`}
                                render={() => (
                                   <GiangVien
                                       coSoDaoTao={coSoDaoTao}
                                   />
                                )}
                            />
                            <Route
                                path={`${this.props.match.url}/nhomkhoahoc/:nhomKhoaHocId`}
                                render={() => (
                                    <KhoaHoc
                                        {...this.props}
                                       coSoDaoTao={coSoDaoTao}
                                       match={match}
                                   />
                               )}
                            />
                            <Route
                                path={`${this.props.match.url}/tailieu/nhomkhoahoc/:nhomKhoaHocId`}
                                render={() => (
                                    <TaiLieu
                                        {...this.props}
                                       coSoDaoTao={coSoDaoTao}
                                       match={match}
                                   />
                               )}
                            />
                        </div>
                    </div>
                </div>
        )
    }
}

export default withRouter(CoSoDaoTao);
