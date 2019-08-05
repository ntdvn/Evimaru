import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import defaultKhoaHoc from "../images/default_khoaHoc.jpg";
import { Button } from "mdbreact";
import { truncate } from "../services/multifunctional"

class KhoaHocManagerHocVienItem extends Component {
    constructor(props){
        super(props);
    }
    defaultImage(e){
        e.target.src = defaultKhoaHoc
    }
    // toLocaleDateString('en-GB')
    render() {
        const { khoaHoc, imageUrl, match } = this.props;
        // console.log(khoaHoc);


        return (
            <div>
                <div className="row p-0 m-0">
                    <div className="col-md-4 p-0 m-0">
                        <img
                            src={khoaHoc.imageUrl||defaultKhoaHoc}
                            alt="Image not found"
                            onError={this.defaultImage}
                            className="img-thumbnail img-fluid"
                            style={{width: "100%", height: "250px"}}
                        />
                    </div>
                    <div className="col-md-8 p-0 m-0 pl-3">
                        <h3>HELLO WORLD</h3>
                        <div className="row">
                            <div className="col-md-4">
                                <h5><strong>Ngày đăng ký: </strong></h5>
                                <h5><strong>Tình trạng: </strong></h5>
                            </div>
                            <div className="col-md-6">
                                <h5>112233</h5>
                                <h5>13 - 3 - 2017</h5>
                                <h5>Đang học</h5>
                            </div>
                        </div>
                        <Link
                            style={{outLine:"none"}}
                            className="btn btn-default m-0 mb-2 mt-2 mr-2"
                            to={`/hocvien/khoahoc/${khoaHoc._id}`}
                        >
                            Chi tiết
                        </Link>
                    </div>
                </div>
                <hr className="style-two"/>
            </div>
        )
    }
}

export default withRouter(KhoaHocManagerHocVienItem);
