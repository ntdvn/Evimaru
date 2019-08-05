import React, {Component} from "react";
// import {Link} from "react-router-dom";
// import { BrowserRouter as Router } from 'react-router-dom';
import {connect} from "react-redux";
import {logout} from "../store/actions/auth";
import { Link, withRouter } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem,
    NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormInline } from 'mdbreact';
import { JSONisEmpty, getIdFromArray } from "../services/multifunctional";

class NavbarBackLink extends Component {
    constructor(props) {
        super(props);
            this.state = {
            isOpen: false
          };
          this.toggleCollapse = this.setState({ isOpen: !this.state.isOpen });

    }


    render() {
        const { backLinkArr } = this.props;
        var backLinkList;
        if(!JSONisEmpty(backLinkArr)){
            backLinkList = backLinkArr.map((backLink, i) => {
                if(i!=backLinkArr.length-1) return (
                    <div className="NavbarBackLink p-0" key={i}>
                        <Link className="NavbarBackLink" to={backLink.link}>
                            {backLink.name}
                        </Link>
                        <div className="NavbarBackLink"> > </div>
                    </div>
                )
                else return (
                    <div className="NavbarBackLink p-0" key={i}>
                        <Link className="NavbarBackLink" to={backLink.link}>
                            {backLink.name}
                        </Link>
                    </div>
                )
            })
        }

        const { match, coSoDaoTao, nhomKhoaHoc, khoaHoc } = this.props;
        return (
            <div>
                { backLinkList }
            </div>
        );
    }
}

export default NavbarBackLink;
