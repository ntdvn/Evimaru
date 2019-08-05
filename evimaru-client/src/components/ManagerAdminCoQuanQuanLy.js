import React, {Component} from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import { Animation, Input, Button,
    Navbar, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse,Container,
    Modal, ModalBody, ModalHeader, ModalFooter, MDBDataTable,
    MDBBtn, MDBTable, MDBTableBody, MDBTableHead, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "mdbreact";
import TableDropDown from "../components/TableDropDown"
import { tableCqql } from "../services/table"
import { JSONisEmpty } from "../services/multifunctional"

class ManagerAdminCoQuanQuanLy extends Component{
    constructor(props){
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
            modal: false,
            modalUpdate: false,
            name: "",
            code: "",
        };
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    handlerInputChange = e => {
        this.setState({[e.target.id]: e.target.value})
    }

    handlePost = e => {
        e.preventDefault();
        this.props.postCoQuanQuanLy({
            name: this.state.name,
            code: this.state.code
        })
    }

    handleUpdate = (id, cqql) => {
        this.props.updateCoQuanQuanLy(id, cqql)
    }

    handlerRemove = (id) => {
        this.props.removeCoQuanQuanLy(id)
    }

    render(){
        const { history, match, success, errors, removeError, removeSuccess, coQuanQuanLys } = this.props;
        var table;
        if(!JSONisEmpty(coQuanQuanLys)){
            const data = tableCqql(coQuanQuanLys, this.handlerRemove, this.handleUpdate, "cqql");
            table = <div className="mt-3 text-wrap">
                <MDBDataTable
                reponsive="true"
                fixed
                  striped
                  bordered
                  hover
                  data={data}
                />
            </div>
        }
        return(
            <div>
                <div>
                    <div>
                        <Button className="m-0 mb-2" onClick={this.toggle}>Thêm</Button>

                    </div>
                    {table}
                </div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <form onSubmit={this.handlePost}>
                        <ModalHeader toggle={this.toggle}>Thêm cơ sở đào tạo</ModalHeader>
                        <ModalBody>
                            <Input
                                label="Tên cơ quan quản lý"
                                id="name"
                                onChange={this.handlerInputChange}
                                required
                                value={this.state.name}
                            />
                            <Input
                                label="mã"
                                id="code"
                                onChange={this.handlerInputChange}
                                required
                                value={this.state.code}
                            />

                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>Hủy</Button>{' '}
                            <Button type="submit" color="primary">Tạo Ngay</Button>
                        </ModalFooter>
                    </form>
                    </Modal>
            </div>
        )
    }
}

export default ManagerAdminCoQuanQuanLy;
