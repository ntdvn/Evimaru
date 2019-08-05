import React, { Component } from "react";
import { Link } from "react-router-dom";
import defaultKhoaHoc from "../images/default_khoaHoc.jpg";
import { Button } from "mdbreact";
import { JSONisEmpty, truncate } from "../services/multifunctional"

class KhoaHocItem extends Component {
    constructor(props){
        super(props);
    }
    defaultImage(e){
        e.target.src = defaultKhoaHoc
    }
    render() {
        const { match, khoaHoc } = this.props;
            // <p>{truncate(gioiThieu)}</p>
        const { name, _id, gioiThieu, imageUrl } = khoaHoc;
        return (
            <div>
                <div className="row p-0 m-0">
                    <div className="col-md-4 p-0 m-0">
                        <img
                            src={imageUrl||defaultKhoaHoc}
                            alt="Image not found"
                            onError={this.defaultImage}
                            className="img-thumbnail img-fluid"
                            style={{width: "100%", height: "250px"}}
                        />
                    </div>
                    <div className="col-md-8 p-0 m-0 pl-3">
                        <h3>{name}</h3>
                        <div>{truncate(gioiThieu)}</div>
                            <Link
                                style={{outLine:"none"}}
                                className="btn btn-default m-0 mb-2"
                                to={`${match.url}/khoahoc/${_id}`}
                            >
                                Xem thêm
                            </Link>
                    </div>
                </div>
                <hr className="style-two"/>
            </div>
        )
    }
}

export default KhoaHocItem;
