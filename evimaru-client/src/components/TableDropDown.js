import React, { Component } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Button, Modal, ModalBody, ModalHeader, ModalFooter, Input } from "mdbreact";

class TableDropDown extends Component{
    constructor(props){
        super(props);
        this.state = {
            collapse: false,
            name: "",
            code: ""
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
    handlerUpdate = e => {
        e.preventDefault();
        this.setState({
            modal: !this.state.modal
        });
        this.props.update(this.props.id, {[this.props.fieldPost]: {name: this.state.name, code: this.state.code}});
    }

    render(){
        return(
            <div>
                <Dropdown>
                    <DropdownToggle color="primary" className="m-0">
                        <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={this.props.remove}>
                            Xóa
                        </DropdownItem>
                        <DropdownItem onClick={this.toggle}>
                            Sửa
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <form onSubmit={this.handlerUpdate}>
                    <ModalHeader toggle={this.toggle}>Sửa cơ sở đào tạo</ModalHeader>
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
                        <Button type="submit" color="primary">Sửa</Button>
                    </ModalFooter>
                </form>
                </Modal>
            </div>

        )
    }
}

export default TableDropDown;
