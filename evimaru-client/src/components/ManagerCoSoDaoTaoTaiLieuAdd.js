import React, { Component} from "react";
import { Input, Button, MDBDataTable, Modal, ModalHeader, ModalBody, ModalFooter, NavLink } from "mdbreact";
import { withRouter, Link } from "react-router-dom";
import { JSONisEmpty } from "../services/multifunctional";
import NavbarBackLink from "../components/NavbarBackLink";

class ManagerCoSoDaoTaoTaiLieuAdd extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            publishingYear: "",
            publisher: "",
            author: "",
            usingFor: "",
        }
    }

    handlerInputChange = e => {
        this.setState({[e.target.id]: e.target.value})
    }
    handlePost = (nhomKhoaHocId, khoaHocId, e) => {
        console.log(khoaHocId);
        e.preventDefault();
        this.props.postTaiLieu(khoaHocId,
            {
                ...this.state
            }
        )
        this.props.history.push(`/user/manager/tailieu/nhomkhoahoc/${nhomKhoaHocId}/khoahoc/${khoaHocId}`);
    }
    // handleUpdate = (id, csdt) => {
    //     this.props.updateCoSoDaoTao(id, csdt)
    // }
    //
    // handlerRemove = (id) => {
    //     this.props.removeCoSoDaoTao(id)
    // }
    componentDidMount(){

    }

    render() {
        // console.log(this.props);
        const { success, errors, coSoDaoTao, match, history } = this.props;
        // console.log(coSoDaoTao);

        if(!JSONisEmpty(coSoDaoTao)){
            var nhomKhoaHoc = coSoDaoTao.nhomKhoaHoc.find(nhomKhoaHoc => nhomKhoaHoc._id===match.params.nhomKhoaHocId)
            var table, thisKhoaHoc;
            if(nhomKhoaHoc.hasOwnProperty('khoaHoc')){
                const { khoaHoc } = nhomKhoaHoc;
                thisKhoaHoc = khoaHoc.find(khoaHoc => khoaHoc._id == match.params.khoaHocId)
                var backLinkArr = [
                    {
                        name: `${nhomKhoaHoc.name}`,
                        link: `/user/manager/tailieu/nhomkhoahoc/${nhomKhoaHoc._id}`,
                    },
                    {
                        name: `${thisKhoaHoc.name}`,
                        link: `/user/manager/tailieu/nhomkhoahoc/${nhomKhoaHoc._id}/khoahoc/${thisKhoaHoc._id}`,
                    },
                    {
                        name: `Thêm tài liệu`,
                        link: `/user/manager/tailieu/nhomkhoahoc/${nhomKhoaHoc._id}/khoahoc/${thisKhoaHoc._id}/add`,
                    },
                ]
                return (
                    <div>
                        <NavbarBackLink
                            backLinkArr={backLinkArr}
                        />
                        <h3 className="my-3">Khóa học: {thisKhoaHoc.name}</h3>
                        <form onSubmit={this.handlePost.bind(this, nhomKhoaHoc._id, thisKhoaHoc._id)}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="input-name">Tên tài liệu</span>
                                        </div>
                                        <input
                                            id="name"
                                            type="text"
                                            class="form-control"
                                            placeholder="Tên tài liệu"
                                            aria-label="Tên tài liệu"
                                            aria-describedby="input-name"
                                            onChange={this.handlerInputChange}
                                            value={this.state.name}
                                            required
                                         />
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="input-author">Tác giả</span>
                                        </div>
                                        <input
                                            id="author"
                                            type="text"
                                            class="form-control"
                                            placeholder="Tác giả"
                                            aria-label="Tác giả"
                                            aria-describedby="input-author"
                                            onChange={this.handlerInputChange}
                                            value={this.state.author}
                                            required
                                         />
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="input-publishing-year">Năm xuất bản</span>
                                        </div>
                                        <input
                                            id="publishingYear"
                                            type="number"
                                            min="1900"
                                            max="2019"
                                            class="form-control"
                                            placeholder="Năm xuất bản"
                                            aria-label="Năm xuất bản"
                                            aria-describedby="input-publishing-year"
                                            onChange={this.handlerInputChange}
                                            value={this.state.publishingYear}
                                            required
                                         />
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="input-publisher">Nhà xuất bản</span>
                                        </div>
                                        <input
                                            id="publisher"
                                            type="text"
                                            class="form-control"
                                            placeholder="Nhà xuất bản"
                                            aria-label="Nhà xuất bản"
                                            aria-describedby="input-publisher"
                                            onChange={this.handlerInputChange}
                                            value={this.state.publisher}
                                            required
                                         />
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="input-using-for">Sử dụng cho</span>
                                        </div>
                                        <input
                                            id="usingFor"
                                            type="text"
                                            class="form-control"
                                            placeholder="Sử dụng cho"
                                            aria-label="Sử dụng cho"
                                            aria-describedby="input-using-for"
                                            onChange={this.handlerInputChange}
                                            value={this.state.usingFor}
                                            required
                                         />
                                    </div>
                                </div>

                            </div>

                            <Button type="submit" className="btn btn-default m-0 mb-2">Thêm tài liệu</Button>
                        </form>

                    </div>
                )
            }
        } else {
            return (
                <div>ERROR</div>
            )
        }
    }
}

export default withRouter(ManagerCoSoDaoTaoTaiLieuAdd);
