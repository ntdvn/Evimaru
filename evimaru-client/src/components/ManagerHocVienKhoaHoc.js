import React, { Component} from "react";
// import { withRouter } from "react-router-dom";
import { Input, Button, MDBDataTable, Modal, ModalHeader, ModalBody, ModalFooter } from "mdbreact";
import { tableManagerKhoaHocCapPhep } from "../services/table";
import { JSONisEmpty } from "../services/multifunctional"
import KhoaHocManagerHocVienItem from "./KhoaHocManagerHocVienItem";
class ManagerHocVienKhoaHoc extends Component{
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

    componentDidMount(){
    }

    render() {
        const { guest } = this.props;
        if(!JSONisEmpty(guest)){
            const { coSoDaoTaos, currentUser } = guest;
            var khoaHocDangHocList;
            if(guest.hasOwnProperty('coSoDaoTaos') && guest.hasOwnProperty('currentUser')){
                khoaHocDangHocList = currentUser.user.khoaHocDangKy.map((khdk, i) => (
                    <KhoaHocManagerHocVienItem
                        khoaHoc={khdk.khoaHoc}
                        {...this.props}
                    />
                ))
                return (
                    <div>
                        {khoaHocDangHocList}
                    </div>
                )
            }
        }
        return (
            <div>
                ERROR
            </div>
        )
    }
}

export default ManagerHocVienKhoaHoc;
