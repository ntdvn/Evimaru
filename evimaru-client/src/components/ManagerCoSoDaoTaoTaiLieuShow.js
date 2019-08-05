import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Button, MDBDataTable } from "mdbreact";
import NavbarBackLink from "../components/NavbarBackLink";
import { JSONisEmpty } from "../services/multifunctional";
import MyDefaultStyleTable from "./MyDefaultStyleTable";

class ManagerCoSoDaoTaoTaiLieuShow extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        const { success, errors, coSoDaoTao, match, history } = this.props;
        // console.log(coSoDaoTao);

        if(!JSONisEmpty(coSoDaoTao)){
            var nhomKhoaHoc = coSoDaoTao.nhomKhoaHoc.find(nhomKhoaHoc => nhomKhoaHoc._id===match.params.nhomKhoaHocId)
            var table, data, thisKhoaHoc, listTaiLieu, clickItem;
            if(nhomKhoaHoc.hasOwnProperty('khoaHoc')){
                const { khoaHoc } = nhomKhoaHoc;
                thisKhoaHoc = khoaHoc.find(khoaHoc => khoaHoc._id == match.params.khoaHocId)
                listTaiLieu = thisKhoaHoc.taiLieu.map((taiLieu, i) => {
                    let namXuatBanDate = new Date(taiLieu.publishingYear).getFullYear();
                    return {

                        name: taiLieu.name,
                        autjor: taiLieu.author,
                        publishingYear: namXuatBanDate,
                        publisher: taiLieu.publisher,
                        usingFor: taiLieu.usingFor
                    }
                })
                data = {
                    columns: [
                        {
                            label: "Tên tài liệu",
                            field: "name",
                            width: "20%"
                        },
                        {
                            label: "Tác giả",
                            field: "author",
                            width: "20%"
                        },
                        {
                            label: "Năm xuất bản",
                            field: "publishingYear",
                            width: "15%"
                        },
                        {
                            label: "Nhà xuất bản",
                            field: "publisher",
                            width: "20%"
                        },
                        {
                            label: "Đối tượng dùng",
                            field: "usingFor",
                            width: "20%"
                        },
                    ],
                    rows: listTaiLieu
                }

                table = <div className="mt-3 text-wrap">
                    <MDBDataTable
                        reponsive="true"
                        bordered
                        hover
                        data={data}
                    />
                </div>

                var backLinkArr = [
                    {
                        name: `${nhomKhoaHoc.name}`,
                        link: `/user/manager/tailieu/nhomkhoahoc/${nhomKhoaHoc._id}`,
                    },
                    {
                        name: `${thisKhoaHoc.name}`,
                        link: `/user/manager/tailieu/nhomkhoahoc/${nhomKhoaHoc._id}/khoahoc/${thisKhoaHoc._id}`,
                    },
                ]


                return (
                    <div>
                        <NavbarBackLink
                            backLinkArr={backLinkArr}
                        />
                        <div>
                            <Link
                                style={{outLine:"none"}}
                                className="btn btn-default m-0 mb-2 mt-2 mr-2"
                                to={`/user/manager/tailieu/nhomkhoahoc/${thisKhoaHoc.nhomKhoaHoc}/khoahoc/${thisKhoaHoc._id}/add`}
                            >
                                Thêm tài liệu
                            </Link>
                            {table}
                        </div>
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

export default withRouter(ManagerCoSoDaoTaoTaiLieuShow);
