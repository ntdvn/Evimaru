import React, { Component} from "react";
import { Switch, Link, withRouter, Route } from "react-router-dom";
import { Input, Button, MDBDataTable, Modal, ModalHeader, ModalBody, ModalFooter } from "mdbreact";
import { tableManagerKhoaHocCapPhep } from "../services/table";
import { JSONisEmpty } from "../services/multifunctional"
import MyDefaultStyleTable from "./MyDefaultStyleTable";
import ManagerCoSoDaoTaoTaiLieuShow from "./ManagerCoSoDaoTaoTaiLieuShow";
import ManagerCoSoDaoTaoTaiLieuAdd from "./ManagerCoSoDaoTaoTaiLieuAdd";

class ManagerCoSoDaoTaoTaiLieu extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            name: "",
            type: "",
            detail: "",
            quantity: undefined,
            condition: ""
        }
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    handlerInputChange = e => {
        this.setState({[e.target.id]: e.target.value})
    }
    handlerPostActiveCourse = (id, key) => {
        this.props.postActiveKhoaHoc(
            id,
            { activeKey: key }
        )
    }

    componentDidMount(){
    }

    render() {
        const { success, errors, coSoDaoTao, match, history } = this.props;
        var listKhoaHocManagerItems, data, table;
        if(!JSONisEmpty(coSoDaoTao)){
            var nhomKhoaHoc = coSoDaoTao.nhomKhoaHoc.find(nhomKhoaHoc => nhomKhoaHoc._id===this.props.match.params.nhomKhoaHocId)
            if(nhomKhoaHoc.hasOwnProperty('khoaHoc')){
                const { khoaHoc } = nhomKhoaHoc;
                listKhoaHocManagerItems = khoaHoc.map((khoaHoc, i) => {
                    let key;
                    if(khoaHoc.activeCourse)  key=false;
                    else key=true;

                    let ngayDuocCapDate, ngayHetHanDate, today;
                    ngayDuocCapDate = new Date(khoaHoc.ngayDuocCap);
                    ngayHetHanDate = new Date(khoaHoc.ngayHetHan);
                    today = new Date();

                    var buttonMoLop, divActived, textButton, tinhTrang, xemTaiLieu;
                    xemTaiLieu =
                    <Link
                        style={{outLine:"none"}}
                        className="btn btn-default m-0 mb-2 mt-2 mr-2 w-100"
                        to={`/user/manager/tailieu/nhomkhoahoc/${khoaHoc.nhomKhoaHoc}/khoahoc/${khoaHoc._id}`}
                    >
                        Xem
                    </Link>


                    return {
                        khoaHocName: khoaHoc.name,
                        khoaHocCode: khoaHoc.code,
                        ngayDuocCap: ngayDuocCapDate.toLocaleDateString('en-GB'),
                        ngayHetHan: ngayHetHanDate.toLocaleDateString('en-GB'),
                        soLuongTaiLieu: khoaHoc.taiLieu.length,
                        xemTaiLieu: xemTaiLieu
                    }
                })

                data = {
                    columns: [
                        {
                            label: "Tên khóa học",
                            field: "khoaHocName",
                            width: 5
                        },
                        {
                            label: "Mã",
                            field: "khoaHocCode",
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
                            field: "soLuongTaiLieu",
                            width: 5
                        },
                        {
                            label: "Chi tiết",
                            field: "xemTaiLieu",
                            width: 5
                        },

                    ],
                    rows: listKhoaHocManagerItems
                }

                table = <div className="mt-3 text-wrap">
                    <MDBDataTable
                        reponsive="true"
                        bordered
                        hover
                        data={data}
                    />
                </div>
                // clickItem = (position) => {
                //     history.push(`/user/manager/tailieu/nhomkhoahoc/${listKhoaHocManagerItems[position].nhomKhoaHocId}/khoahoc/${listKhoaHocManagerItems[position].khoaHocId}`)
                // }
                // console.log(this.props.match.url);
                return (
                    <div>

                        {errors.message && (
                            <div className="alert alert-danger" role="alert">
                                {errors.message}
                            </div>
                        )}
                        {success.message && (
                            <div className="alert alert-success" role="alert">
                                {success.message}
                            </div>
                        )}
                        <Switch>

                            <Route
                                exact
                                path={`/user/manager/tailieu/nhomkhoahoc/:nhomKhoaHocId/khoahoc/:khoaHocId/add`}
                                render={() =>
                                    <ManagerCoSoDaoTaoTaiLieuAdd
                                        {...this.props}
                                    />
                                }
                            />
                            <Route
                                exact
                                path={`/user/manager/tailieu/nhomkhoahoc/:nhomKhoaHocId/khoahoc/:khoaHocId`}
                                render={() =>
                                    <ManagerCoSoDaoTaoTaiLieuShow
                                        {...this.props}
                                    />
                                }
                            />
                            <Route
                                exact
                                path={`${this.props.match.url}/`}
                                render={() =>
                                    <div>
                                        <h2>{nhomKhoaHoc.name}</h2>
                                        {table}
                                    </div>
                                }
                            />

                        </Switch>

                    </div>
                )
            }
        }
        return (
            <div>ERROR</div>
        )
    }
}

export default withRouter(ManagerCoSoDaoTaoTaiLieu);
