import React, {Component} from "react";
// import {Link} from "react-router-dom";
// import { BrowserRouter as Router } from 'react-router-dom';
import {connect} from "react-redux";
import {logout} from "../store/actions/auth";
import { withRouter } from 'react-router';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';


class NavbarSide extends Component {
    constructor(props) {
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
    logout = e => {
        e.preventDefault();
        this.props.logout();
        this.props.history.push("/login");
    }
    render() {
        return (
                <Navbar className="p-0 m-0" color="#0277bd light-blue darken-2" expand="md" dark>
                    <NavbarBrand className="m-0 p-0">
                        <NavLink to="/" ><strong className="text-white">Hệ thống quản lý điện tử</strong></NavLink>

                    </NavbarBrand>
                    { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                    <Collapse isOpen = { this.state.collapse } navbar>
                            {
                                !this.props.currentUser.isAuthenticated ? (
                                        <NavbarNav right>
                                            <NavItem>
                                                <NavLink className="nav-link m-0" to="/signup">Đăng ký</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink className="nav-link m-0" to="/login">Đăng nhập</NavLink>
                                            </NavItem>
                                        </NavbarNav>

                                ) : (
                                    <NavbarNav right>
                                        <NavItem>
                                            <Dropdown>
                                                <DropdownToggle caret color="success" dropup="true">{this.props.currentUser.user.username}</DropdownToggle>
                                                <DropdownMenu right>

                                                    <DropdownItem header>{this.props.currentUser.user.role.name}</DropdownItem>
                                                    <DropdownItem>
                                                        <NavLink className="nav-link p-0 m-0 text-success" to="/user">Thông tin <i className="fa fa-user mr-3" aria-hidden="true"></i></NavLink>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <div className="nav-link p-0 m-0 text-muted" onClick={this.logout}>Đăng xuất <i className="fa fa-sign-out" aria-hidden="true"></i></div>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </NavItem>
                                    </NavbarNav>
                                )
                            }
                    </Collapse>
                </Navbar>

        );
    }
}
function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    };
}

export default withRouter(connect(mapStateToProps, {logout}) (NavbarSide));
