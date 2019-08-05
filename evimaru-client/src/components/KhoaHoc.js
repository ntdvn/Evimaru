import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import { Switch, Route, withRouter, Link } from "react-router-dom";
import { tableKhoaHoc } from "../services/table";
import KhoaHocItem from "./KhoaHocItem";
import KhoaHocShow from "../containers/KhoaHocShow";
import MyDefaultStyleTable from "./MyDefaultStyleTable";
import NavbarBackLink from "./NavbarBackLink";
import { JSONisEmpty } from "../services/multifunctional"

class KhoaHoc extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const { coSoDaoTao, guest, match, history } = this.props;
        if(coSoDaoTao){
            var nhomKhoaHoc = coSoDaoTao.nhomKhoaHoc.find(nhomKhoaHoc => nhomKhoaHoc._id===match.params.nhomKhoaHocId)
            var khoaHocs, table, data, backLinkArr;
            if(!JSONisEmpty(nhomKhoaHoc)){
                if(nhomKhoaHoc.hasOwnProperty('khoaHoc')){
                    const { khoaHoc} = nhomKhoaHoc;
                    khoaHocs = khoaHoc.filter((khoaHoc, i) => khoaHoc.activeCourse==true)
                    .map((khoaHoc, i) => {
                        let ngayDuocCap, ngayHetHan, today, chiTietKhoaHoc, tinhTrang;
                        ngayDuocCap = new Date(khoaHoc.ngayDuocCap);
                        ngayHetHan = new Date(khoaHoc.ngayHetHan);
                        today = new Date();
                        if(ngayDuocCap>today || ngayHetHan<today){
                            // buttonMoLop = <button type="button" className="btn btn-primary border-0 w-100" >Đã hết hạn</button>;
                            tinhTrang = "Đã hết hạn";
                            chiTietKhoaHoc = <div
                                style={{outLine:"none"}}
                                className="btn special-color m-0 mb-2 mt-2 mr-2 w-100"
                            >
                                Đã hết hạn
                            </div>
                        }
                        else if(ngayDuocCap<today && today<ngayHetHan){
                            tinhTrang = "Được cấp phép";
                            // buttonMoLop = <button type="button" className="btn btn-danger border-0 w-100" >Đã cấp phép</button>;
                            // buttonMoLop = <button type="button" className="btn btn-danger border-0 w-100" onClick={this.handlerPostActiveCourse.bind(this, khoaHoc._id, key)}>{textButton}</button>
                            chiTietKhoaHoc =
                            <Link
                                style={{outLine:"none"}}
                                className="btn btn-default m-0 mb-2 mt-2 mr-2 w-100"
                                to={`${match.url}/khoahoc/${khoaHoc._id}`}
                            >
                                Chi tiết
                            </Link>
                        }

                        return {
                            name: khoaHoc.name,
                            code: khoaHoc.code,
                            ngayDuocCap: ngayDuocCap.toLocaleDateString('en-GB'),
                            ngayHetHan: ngayHetHan.toLocaleDateString('en-GB'),
                            tinhTrang: tinhTrang,
                            chiTietKhoaHoc: chiTietKhoaHoc
                            // _id: khoaHoc._id
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
                                label: "Tình trạng",
                                field: "tinhTrang",
                                width: 5
                            },
                            {
                                label: "Chi Tiết",
                                field: "chiTietKhoaHoc",
                                width: 5
                            },

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
                            name: `${nhomKhoaHoc.name} - Khóa học`,
                            link: `/csdt/${coSoDaoTao._id}/nhomkhoahoc/${nhomKhoaHoc._id}`,
                        },
                    ]
                }
            }
        }
        return (
            <div>
                <Switch>
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

export default withRouter(KhoaHoc);
