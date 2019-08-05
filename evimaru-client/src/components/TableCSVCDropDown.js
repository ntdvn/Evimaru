import React, { Component } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Button, Modal, ModalBody, ModalHeader, ModalFooter, Input } from "mdbreact";

class TableCSVCDropDown extends Component{
    constructor(props){
        super(props);
        this.state = {
            collapse: false,
            name: "",
            type: "",
            detail: "",
            quantity: undefined,
            condition: ""
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
        const csvcType=["Phòng Học", "Thiết bị mô phỏng", "Thiết bị thực hành"];
        var optionCSVCType = csvcType.map((d,i) => {
            return (
                <option value={d} key={i}>{d}</option>
            )
        })
        return(
            <div>
                <Dropdown>
                    <DropdownToggle color="primary" className="m-0">
                        <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={this.toggle}>
                            Sửa
                        </DropdownItem>
                        <DropdownItem onClick={this.props.remove}>
                            Xóa
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <form onSubmit={this.handlePost}>
                        <ModalHeader toggle={this.toggle}>Thêm cơ sở vật chất</ModalHeader>
                        <ModalBody>
                            <select id="type" className="browser-default custom-select m-0" defaultValue="type" onChange={this.handlerInputChange}>
                                <option value="type" disabled >Chọn nhóm của cơ sở vật chất</option>
                                {optionCSVCType}
                            </select>
                            <Input
                                label="Tên cơ sở vật chất"
                                id="name"
                                onChange={this.handlerInputChange}
                                required
                                value={this.state.name}
                            />
                            <Input
                                label="Mô tả"
                                id="detail"
                                onChange={this.handlerInputChange}
                                required
                                value={this.state.detail}
                            />
                            <Input
                                label="Số lượng"
                                id="quantity"
                                onChange={this.handlerInputChange}
                                required
                                type="number"
                                value={this.state.quantity}
                            />
                            <Input
                                label="Tình trạng"
                                id="condition"
                                onChange={this.handlerInputChange}
                                required
                                type="text"
                                value={this.state.condition}
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

export default TableCSVCDropDown;
