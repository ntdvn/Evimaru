import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { MDBDataTable } from 'mdbreact';
import NavbarBackLink from "./NavbarBackLink";
import { JSONisEmpty, getIdFromArray } from "../services/multifunctional"

class TaiLieuShow extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        const { coSoDaoTao, nhomKhoaHoc, khoaHocs, match } = this.props;
        var khoaHoc, taiLieu, table, data, backLinkArr;
        if(!JSONisEmpty(khoaHocs)){
            khoaHoc = getIdFromArray(match.params.khoaHocId, khoaHocs);
            taiLieu = khoaHoc.taiLieu.map((taiLieu, i) => {
                console.log(taiLieu);
                let publisherYear = new Date(taiLieu.publishingYear).getFullYear();
                return {
                    name: taiLieu.name,
                    author: taiLieu.author,
                    publisher: taiLieu.publisher,
                    publisherYear: publisherYear,
                    usingFor: taiLieu.usingFor

                }
            })


            data = {
                columns: [
                    {
                        label: "Tên tài liệu",
                        field: "name",
                        width: 5
                    },
                    {
                        label: "Tác giả",
                        field: "author",
                        width: 5
                    },
                    {
                        label: "Nhà xuất bản",
                        field: "publisher",
                        width: 5
                    },
                    {
                        label: "Năm xuất bản",
                        field: "ngayHetHan",
                        width: 5
                    },
                    {
                        label: "Tài liệu",
                        field: "taiLieu",
                        width: 5
                    },
                ],
                rows: taiLieu
            }
            table = <div className="mt-3 text-wrap">
                <MDBDataTable
                    reponsive="true"
                    bordered
                    hover
                    data={data}
                />
            </div>

            backLinkArr = [
                {
                    name: `${coSoDaoTao.name}`,
                    link: `/csdt/${coSoDaoTao._id}`,
                },
                {
                    name: `${nhomKhoaHoc.name} - Tài liệu`,
                    link: `/csdt/${coSoDaoTao._id}/tailieu/nhomkhoahoc/${nhomKhoaHoc._id}`,
                },
                {
                    name: khoaHoc.name,
                    link: `/csdt/${coSoDaoTao._id}/tailieu/nhomkhoahoc/${nhomKhoaHoc._id}/khoahoc/${khoaHoc._id}`,
                },
            ]
            return (
                <div>
                    <NavbarBackLink
                        backLinkArr={backLinkArr}
                    />
                    {table}
                </div>
            )
        } else {
            return (
                <div>ERROR</div>
            )
        }


    }
}



export default withRouter(TaiLieuShow);
