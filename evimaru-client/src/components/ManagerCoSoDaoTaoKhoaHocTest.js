import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import NavbarBackLink from "../components/NavbarBackLink";
import MyDefaultStyleTable from "./MyDefaultStyleTable";
import { JSONisEmpty, getIdFromArray } from "../services/multifunctional";

class ManagerCoSoDaoTaoKhoaHocTest extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        const { khoaHoc, nhomKhoaHoc, match } = this.props;

        var data, clickItem, baiKiemTras;
        if(!JSONisEmpty(khoaHoc)){
            if(khoaHoc.hasOwnProperty('baiKiemTra')){
                var { baiKiemTra } = khoaHoc;
                baiKiemTras = baiKiemTra.map((baiKiemTra, i) => {
                    // console.log(baiKiemTra);
                    return {
                        tenBaiKiemTra: baiKiemTra.tenBaiKiemTra,
                        khoaHocName: khoaHoc.name,
                        soLuongCauHoi: baiKiemTra.cauHoi.length,
                        ghiChu: baiKiemTra.description
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
                            field: "tenBaiKiemTra",
                            width: "25%"
                        },
                        {
                            name: "Khóa học",
                            field: "khoaHocName",
                            width: "30%"
                        },
                        {
                            name: "Số câu hỏi",
                            field: "soLuongCauHoi",
                            width: "10%"
                        },
                        {
                            name: "Ghi chú",
                            field: "ghiChu",
                            width: "30%"
                        },

                    ],
                    rows: baiKiemTras
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
                        name: "Bài kiểm tra",
                        link: `/user/manager/nhomkhoahoc/${nhomKhoaHoc._id}/khoahoc/${khoaHoc._id}/information/test`,
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
                            Thêm bài kiêm tra
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

export default withRouter(ManagerCoSoDaoTaoKhoaHocTest);
