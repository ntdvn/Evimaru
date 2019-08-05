import React, { Component} from "react";
import { connect } from "react-redux";
import { Input, Button, MDBDataTable, Modal, ModalHeader, ModalBody, ModalFooter } from "mdbreact";
import { tableCqql } from "../services/table";
// import { fetchCoSoDaoTao, postCoSoDaoTao, updateCoSoDaoTao, removeCoSoDaoTao } from "../store/actions/co-so-dao-tao";
class ManagerCoQuanQuanLyCoSoDaoTao extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal: false,
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
    handlePost = e => {
        e.preventDefault();
        this.props.postCoSoDaoTao({
            name: this.state.name,
            code: this.state.code
        })
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
        const { success, errors, coSoDaoTaos } = this.props;
        // console.log(this.props);
        var table;
        if(coSoDaoTaos.length){
            const data = tableCqql(coSoDaoTaos, this.handlerRemove, this.handleUpdate, "csdt");
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
        return (
            <div>
                <div>
                    <Button className="m-0 mb-2" onClick={this.toggle}>Thêm</Button>
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
                </div>
                {table}

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <form onSubmit={this.handlePost}>
                    <ModalHeader toggle={this.toggle}>Thêm cơ sở đào tạo</ModalHeader>
                    <ModalBody>
                        <Input
                            label="Tên cơ sở đào tạo"
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

export default ManagerCoQuanQuanLyCoSoDaoTao;
