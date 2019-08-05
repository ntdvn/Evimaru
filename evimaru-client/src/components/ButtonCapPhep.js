import React, { Component } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Button, Modal, ModalBody, ModalHeader, ModalFooter, Input } from "mdbreact";

class ButtonCapPhep extends Component{
    constructor(props){
        super(props);
        this.state = {
            collapse: false,
            modal: false,
            soQuyetDinh: "",
            ngayDuocCap: "",
            ngayHetHan: "",
            coSoDaoTaos: []
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
    handlerListCheck = e => {
       const options = this.state.coSoDaoTaos
       let index;
       if (e.target.checked) {
         options.push(e.target.value)
       } else {
         index = options.indexOf(e.target.value)
         options.splice(index, 1)
       }
       this.setState({ coSoDaoTaos: options })
    }
    handlerPost = e => {
        e.preventDefault();
        this.props.capPhep(
            this.props.id,
            {
                soQuyetDinh: this.state.soQuyetDinh,
                ngayDuocCap: this.state.ngayDuocCap,
                ngayHetHan: this.state.ngayHetHan,
                coSoDaoTaos: this.state.coSoDaoTaos
            });
        this.toggle();
    }


    render(){
        const { coSoDaoTaos } = this.props;
        var listCheckBox = coSoDaoTaos.map((csdt, i) => {
            return (
                <div className="custom-control custom-checkbox" key={csdt._id}>
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id={`coSoDaoTao+${i}`}
                        value={csdt._id}
                        onChange={this.handlerListCheck}
                    />
                    <label className="custom-control-label" htmlFor={`coSoDaoTao+${i}`}>{csdt.name}</label>
                </div>
            )
        })
        return(
            <div>
                <Button className="m-0" color="primary" onClick={this.toggle}>Cấp Phép</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <form onSubmit={this.handlerPost}>
                        <ModalHeader toggle={this.toggle}>Cấp phép khóa học</ModalHeader>
                        <ModalBody>
                            {listCheckBox}

                            <Input
                                label="Số quyết định"
                                id="soQuyetDinh"
                                onChange={this.handlerInputChange}
                                required
                                value={this.state.soQuyetDinh}
                            />
                            <label htmlFor="ngayDuocCap">
                                <span style={{fontSize: "20px"}}>Ngày được cấp</span>
                            </label>
                            <input
                                type="date"
                                data-date-format="DD MMMM YYYY"
                                data-date=""
                                min="2005-01-01"
                                max="2040-01-01"
                                className="form-control"
                                id="ngayDuocCap"
                                onChange={this.handlerInputChange}
                                value={this.state.ngayDuocCap}
                                required
                            />
                        <label htmlFor="ngayHetHan">
                                <span style={{fontSize: "20px"}}>Ngày hết hạn</span>
                            </label>
                            <input
                                type="date"
                                data-date-format="DD MMMM YYYY"
                                data-date=""
                                min="2005-01-01"
                                max="2040-01-01"
                                className="form-control"
                                id="ngayHetHan"
                                onChange={this.handlerInputChange}
                                value={this.state.ngayHetHan}
                                required
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

export default ButtonCapPhep;
