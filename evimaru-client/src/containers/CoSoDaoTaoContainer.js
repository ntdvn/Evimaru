import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import { Animation, ListGroup, ListGroupItem, NavLink } from 'mdbreact';
import CoSoDaoTao from "../components/CoSoDaoTao";
import {JSONisEmpty} from "../services/multifunctional";

class CoSoDaoTaoContainer extends Component {
    constructor(props){
        super(props);
    }
    onClick = () => {
        // console.log("haha");
    }

    render() {
        // console.log(this.props);
        const { match } = this.props;
        const {coSoDaoTaos} = this.props.guest;
        var coSoDaoTaoListItem;
        // console.log(this.props.match.params);
        if(!JSONisEmpty(coSoDaoTaos)) {
            coSoDaoTaoListItem = coSoDaoTaos.map((csdt, i) => {
                if(csdt._id == match.params.csdtId)
                return (
                    <div className="light-blue darken-2 w-100 m-0 rounded-0 text-white p-2" key={csdt._id}>
                        <h2>{csdt.name}</h2>
                        <div><strong>Địa chỉ: </strong>{csdt.lienHe.diaChi}</div>
                        <div><strong>Tel: </strong>{csdt.lienHe.soDienThoai}</div>
                        <div><strong>FAX: </strong>{csdt.lienHe.Fax}</div>
                        <div><strong>Email: </strong> {csdt.lienHe.Email}</div>
                        <div><strong>Website: </strong>{csdt.lienHe.Website}</div>
                    </div>
                )
            })
        }
        return (
            <div className="mt-4">
                <div className="row">
                    <div className="col-md-3 mb-2">
                            {coSoDaoTaoListItem}
                    </div>
                    <div className="col-md-9 pl-1 pr-2">
                        <CoSoDaoTao {...this.props}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CoSoDaoTaoContainer);
