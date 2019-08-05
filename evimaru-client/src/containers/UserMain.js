import React, {Component} from "react";
import {connect} from "react-redux";
import { Animation, Navbar, NavbarBrand, NavbarNav, NavbarToggler,
     Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu,
     DropdownItem, Button, Card, CardBody, Input, ListGroup, ListGroupItem } from 'mdbreact';
import InforCard from "../components/InforCard";
import InforUser from "../components/InforUser";
import ManagerUser from "../containers/ManagerUser";
import { Switch, Route, withRouter, Link } from "react-router-dom";
import {apiCall} from "../services/api";
import withAuth from "../hocs/withAuth";


class UserMain extends Component{
    constructor(props){
        super(props);

    }

    render(){
        // console.log(this.props.match.url);
        const { match, currentUser } = this.props;
        return (
            <Animation type="">
                <div className="mt-4">
                    <div className="row">
                        <div className="col-md-3">
                            <InforCard {...currentUser.user}/>
                            <ListGroup className="mb-3">
                                <ListGroupItem className="p-0 m-0">
                                    <NavLink to={`${match.path}`}
                                        className="light-blue darken-1 w-100 m-0 rounded-0 text-white"
                                    >
                                        Thông tin người dùng
                                    </NavLink>
                                </ListGroupItem>
                                <ListGroupItem className="p-0 m-0">
                                    <NavLink
                                        to={`${match.url}/manager`}
                                        className="light-blue darken-1 w-100 m-0 rounded-0 text-white"
                                    >
                                        Quản lý
                                    </NavLink>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                        <div className="col-md-9">
                            <Route
                                exact
                                path={match.url}
                                render={() =>
                                    <InforUser
                                        {...this.props}
                                    />
                                }
                            />
                            <Route
                                exect
                                path={`${match.url}/manager`}
                                component={withAuth(ManagerUser)}
                            />
                        </div>
                    </div>
                </div>
            </Animation>
        )
    }
}

function mapStateToProps(state){
    return {
        userInformation: state.userInformation,
        currentUser: state.currentUser,
        errors: state.errors
    };
}

export default connect(mapStateToProps) (UserMain);
