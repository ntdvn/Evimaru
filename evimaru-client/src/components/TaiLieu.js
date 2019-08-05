import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import { Switch, Route, withRouter, Link } from "react-router-dom";
import { tableKhoaHoc } from "../services/table";
import TaiLieuShow from "./TaiLieuShow";
import NavbarBackLink from "./NavbarBackLink";
import KhoaHocShow from "../containers/KhoaHocShow";
import MyDefaultStyleTable from "./MyDefaultStyleTable";
import { JSONisEmpty } from "../services/multifunctional"

class TaiLieu extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        const { coSoDaoTao, guest, match, history } = this.props;
        var data, nhomKhoaHoc, khoaHocs, table, backLinkArr;
        if(coSoDaoTao){
            nhomKhoaHoc = coSoDaoTao.nhomKhoaHoc.find(nhomKhoaHoc => nhomKhoaHoc._id===match.params.nhomKhoaHocId)
            if(!JSONisEmpty(nhomKhoaHoc)){
                if(nhomKhoaHoc.hasOwnProperty('khoaHoc')){
                    const { khoaHoc} = nhomKhoaHoc;
                    // khoaHocs = khoaHoc.filter((khoaHoc, i) => khoaHoc.activeCourse==true)
                    khoaHocs = khoaHoc
                    .map((khoaHoc, i) => {
                        let ngayDuocCap, ngayHetHan, chiTietTaiLieu;
                        ngayDuocCap = new Date(khoaHoc.ngayDuocCap).toLocaleDateString('en-GB');
                        ngayHetHan = new Date(khoaHoc.ngayHetHan).toLocaleDateString('en-GB');
                        chiTietTaiLieu =
                        <Link
                            style={{outLine:"none"}}
                            className="btn btn-default m-0 mb-2 mt-2 mr-2 w-100"
                            to={`${match.url}/khoahoc/${khoaHoc._id}`}
                        >
                            Chi tiết
                        </Link>
                        return {
                            name: khoaHoc.name,
                            code: khoaHoc.code,
                            ngayDuocCap: ngayDuocCap,
                            ngayHetHan: ngayHetHan,
                            taiLieu: khoaHoc.taiLieu.length,
                            chiTietTaiLieu: chiTietTaiLieu
                        }
                    })
                    // clickItem = (position) => {
                    //     history.push(`${match.url}/khoahoc/${khoaHocs[position]._id}`)
                    // }
                    data = {
                        columns: [
                            {
                                label: "Tên khóa học",
                                field: "name",
                                width: 5
                            },
                            {
                                label: "Mã",
                                field: "code",
                                width: 5
                            },
                            {
                                label: "Ngày được cấp",
                                field: "ngayDuocCap",
                                width: 5
                            },
                            {
                                label: "Ngày hết hạn",
                                field: "ngayHetHan",
                                width: 5
                            },
                            {
                                label: "Tài liệu",
                                field: "taiLieu",
                                width: 5
                            },
                            {
                                label: "Chi Tiết",
                                field: "chiTietTaiLieu",
                                width: 5
                            }

                        ],
                        rows: khoaHocs
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
                    ]

                    return (
                        <div>
                            <Switch>
                                <Route
                                   path={`${match.url}/khoahoc/:khoaHocId`}
                                   render={() => (
                                      <TaiLieuShow
                                          coSoDaoTao={coSoDaoTao}
                                          nhomKhoaHoc = {nhomKhoaHoc}
                                          khoaHocs={khoaHoc}
                                      />
                                   )}
                                />
                                <Route
                                   path={`${match.url}`}
                                   render={() => (
                                       <div>
                                           <NavbarBackLink
                                               backLinkArr={backLinkArr}
                                           />
                                           {table}
                                       </div>
                                   )}
                                />

                            </Switch>
                        </div>
                    )
                }

            }
        } else {
            return (
                <div>ERROR</div>
            )
        }

    }
}

export default withRouter(TaiLieu);
