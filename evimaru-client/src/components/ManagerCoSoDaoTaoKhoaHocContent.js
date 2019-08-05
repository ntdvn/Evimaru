import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import NavbarBackLink from "../components/NavbarBackLink";
import MyDefaultStyleTable from "./MyDefaultStyleTable";
import { JSONisEmpty, getIdFromArray } from "../services/multifunctional";

class ManagerCoSoDaoTaoKhoaHocContent extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        const { khoaHoc, nhomKhoaHoc, match } = this.props;

        var data, clickItem, baiHocs;
        if(!JSONisEmpty(khoaHoc)){
            if(khoaHoc.hasOwnProperty('baiHoc')){
                var { baiHoc } = khoaHoc;
                baiHocs = baiHoc.map((baiHoc, i) => {
                    return {
                        tenBaiHoc: baiHoc.tenBaiHoc,
                        khoaHocName: khoaHoc.name,
                        soLuongTaiLieu: baiHoc.pdfLinkArr.length,
                        soLuongVideo: baiHoc.videoLinkArr.length,
                        soLuongCauHoi: baiHoc.cauHoi.length
                    }
                })

                clickItem = (position) => {
                }
                data = {
                    columns: [
                        {
                            name: "STT",
                            field: "STT",
                            width: "5%"
                        },
                        {
                            name: "Tên bài học",
                            field: "tenBaiHoc",
                            width: "30%"
                        },
                        {
                            name: "Khóa học",
                            field: "khoaHocName",
                            width: "35%"
                        },
                        {
                            name: "Tài liệu",
                            field: "soLuongTaiLieu",
                            width: "10%"
                        },
                        {
                            name: "Video",
                            field: "soLuongVideo",
                            width: "10%"
                        },
                        {
                            name: "Số câu hỏi",
                            field: "soLuongCauHoi",
                            width: "10%"
                        },

                    ],
                    rows: baiHocs
                }

                var backLinkArr = [
                    {
                        name: `${nhomKhoaHoc.name}`,
                        link: `/user/manager/nhomkhoahoc/${nhomKhoaHoc._id}`,
                    },
                    {
                        name: `${khoaHoc.name}`,
                        link: `/user/manager/nhomkhoahoc/${nhomKhoaHoc._id}/khoahoc/${khoaHoc._id}/information`,
                    },
                    {
                        name: "Nội dung học",
                        link: `/user/manager/nhomkhoahoc/${nhomKhoaHoc._id}/khoahoc/${khoaHoc._id}/information/content`,
                    },
                ]
                return (
                    <div>
                        <NavbarBackLink
                            backLinkArr={backLinkArr}
                        />

                        <Link
                            style={{outLine:"none"}}
                            className="btn btn-default m-0 mb-2 mt-2 mr-2"
                            to={`${match.url}/add`}
                        >
                            Thêm bài học
                        </Link>

                        <div>
                            <MyDefaultStyleTable
                                data={data}
                                clickItem={clickItem}
                            />
                        </div>
                    </div>
                )

            }

        } else {
            return <div>ERROR</div>
        }
    }
}

export default withRouter(ManagerCoSoDaoTaoKhoaHocContent);
