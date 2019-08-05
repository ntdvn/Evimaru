import React, { Component} from "react";
import { Input, Button, MDBDataTable, Modal, ModalHeader, ModalBody, ModalFooter } from "mdbreact";
import { tableManagerCSVC } from "../services/table";

class ManagerCoSoDaoTaoCoSoVatChat extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            name: "",
            type: "",
            detail: "",
            quantity: undefined,
            condition: ""
        }
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    handlerInputChange = e => {
        this.setState({[e.target.id]: e.target.value})
    }
    handlePostCoSoVatChat = e => {
        e.preventDefault();
        this.props.postCoSoVatChat(this.props.coSoDaoTao._id, {
            name: this.state.name,
            type: this.state.type,
            detail: this.state.detail,
            quantity: this.state.quantity,
            condition: this.state.condition
        })
        this.toggle();
    }

    handleUpdate = (id, csdt) => {
        this.props.updateCoSoDaoTao(id, csdt)
    }

    handlerRemove = (id) => {
        this.props.removeCoSoDaoTao(id)
    }
    componentDidMount(){
    }

    render() {
        const { success, errors, coSoDaoTao } = this.props;
        var table;
        if(coSoDaoTao.coSoVatChat != null){
            const data = tableManagerCSVC(coSoDaoTao.coSoVatChat, this.handlerRemove, this.handleUpdate, "csdt");
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
        // {errors.message && (
        //     <div className="alert alert-danger" role="alert">
        //         {errors.message}
        //     </div>
        // )}
        // {success.message && (
        //     <div className="alert alert-success" role="alert">
        //         {success.message}
        //     </div>
        // )}
        // {table}
        const csvcType=["Phòng Học", "Thiết bị mô phỏng", "Thiết bị thực hành"];
        var optionCSVCType = csvcType.map((d,i) => {
            return (
                <option value={d} key={i}>{d}</option>
            )
        })
        return (
            <div>
                <div>
                    {errors.message && (
                        <div className="alert alert-danger" role="alert">
                            {errors.message}
                        </div>
                    )}
                    {success.message && (
                        <div className="alert alert-success" role="alert">
                            {success.message}
                        </div>
                    )}
                    <Button className="m-0 mb-2" onClick={this.toggle}>Thêm</Button>
                </div>
                {table}
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <form onSubmit={this.handlePostCoSoVatChat}>
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
                            <Button type="submit" color="primary">Tạo Ngay</Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        )
    }
}

export default ManagerCoSoDaoTaoCoSoVatChat;
