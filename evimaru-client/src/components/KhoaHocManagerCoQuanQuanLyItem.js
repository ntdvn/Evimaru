import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import defaultKhoaHoc from "../images/default_khoaHoc.jpg";
import { Button } from "mdbreact";
import { truncate, getDateTimeFromData } from "../services/multifunctional"


class KhoaHocManagerCoQuanQuanLyItem extends Component {
    constructor(props){
        super(props);
    }

    defaultImage(e){
        e.target.src = defaultKhoaHoc
    }

    render() {
        const { khoaHoc, match } = this.props;
        const { name, code, _id, nhomKhoaHoc, createdAt, updatedAt } = khoaHoc;
        // console.log(khoaHoc);
        return (
            <div>
                <div className="row p-0 m-0">
                    <div className="col-md-6 p-0 m-0 pl-3">
                        <h3>{name}</h3>
                        <h5><strong>Code: </strong>{code}</h5>
                            <Link
                                style={{outLine:"none"}}
                                className="btn btn-default m-0 mb-2 mt-2 mr-2"
                                to={`${match.url}/${nhomKhoaHoc}/khoahoc/${_id}/capphep`}
                            >
                                Cấp phép
                            </Link>
                    </div>
                    <div className="col-md-6 p-0 m-0 pl-3">
                        <h5><strong>Đã tạo: </strong>{ getDateTimeFromData(createdAt) }</h5>
                        <h5><strong>Đã sửa: </strong>{ getDateTimeFromData(updatedAt) }</h5>
                    </div>
                </div>
                <hr className="style-two"/>
            </div>
        )
    }
}

export default withRouter(KhoaHocManagerCoQuanQuanLyItem);
