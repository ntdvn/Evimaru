import React, { Component} from "react";
import { Link, withRouter } from "react-router-dom";
import { Input, Button, MDBDataTable, Modal, ModalHeader, ModalBody, ModalFooter } from "mdbreact";
import { tableManagerKhoaHoc } from "../services/table";
import { JSONisEmpty } from "../services/multifunctional";
import KhoaHocManagerCoQuanQuanLyItem from "./KhoaHocManagerCoQuanQuanLyItem";
import MyDefaultStyleTable from "./MyDefaultStyleTable";
class ManagerCoQuanQuanLyKhoaHoc extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            modalKhoaHoc: false,
            name: "",
            nhomKhoaHoc: "",
            nameKhoaHoc: "",
            codeKhoaHoc: "",
            imageUrl: "",
            gioiThieu: "",
            selectNhomKhoaHoc: "",
        }
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    toggleKhoaHoc = () => {
        this.setState({
            modalKhoaHoc: !this.state.modalKhoaHoc
        });
    }

    handlerInputChange = e => {
        this.setState({[e.target.id]: e.target.value})
    }

    handlerPostNhomKhoaHoc = e => {
        e.preventDefault();
        // console.log(this.state.name);
        this.props.postNhomKhoaHoc({name: this.state.name});
        this.toggle()
    }
    // handlerSelectNhomKhoaHocChange = e => {
    //     console.log(e.target.value);
    // }

    handlerPostKhoaHoc = e => {
        e.preventDefault();
        this.props.postKhoaHoc(
            {
                name: this.state.nameKhoaHoc,
                code: this.state.codeKhoaHoc,
                gioiThieu: this.state.gioiThieu,
                imageUrl: this.state.imageUrl,
                nhom: this.state.nhomKhoaHoc,
            }
        )
        // console.log(this.state.nhomKhoaHoc);
        // this.props.postNhomKhoaHoc({name: this.state.name});
        this.toggleKhoaHoc()
    }

    handlerCapPhepKhoaHoc = (id, capPhep) => {
        this.props.capPhepKhoaHoc(id, capPhep);
    }

    render() {
        const { nhomKhoaHocs, coSoDaoTaos, success, errors, match, history } = this.props;
        var optionNhomKhoaHocs, table, listKhoaHocItems, data, clickItem;
        if(!JSONisEmpty(nhomKhoaHocs)){
            optionNhomKhoaHocs = nhomKhoaHocs.map((d,i) => {
                return (
                    <option value={d._id} key={d._id}>{d.name}</option>
                )
            })

            if(this.state.selectNhomKhoaHoc){
                var nhomKhoaHoc = nhomKhoaHocs.find((d,i) =>
                   d._id === this.state.selectNhomKhoaHoc
                )
                listKhoaHocItems = nhomKhoaHoc.khoaHoc.map((khoaHoc, i) => {
                    // console.log(khoaHoc);
                    let capPhepKhoaHoc;
                    var createdAtDate, updatedAtDate;
                    createdAtDate = new Date(khoaHoc.createdAt);
                    updatedAtDate = new Date(khoaHoc.updatedAt);
                    capPhepKhoaHoc =
                    <Link
                        style={{outLine:"none"}}
                        className="btn btn-default m-0 mb-2 mt-2 mr-2 w-100"
                        to={`${match.url}/${khoaHoc.nhomKhoaHoc}/khoahoc/${khoaHoc._id}/capphep`}
                    >
                        Cấp phép
                    </Link>
                    return {
                        khoaHocName: khoaHoc.name,
                        khoaHocCode: khoaHoc.code,
                        createdAt: createdAtDate.toLocaleDateString('en-GB'),
                        updatedAt: updatedAtDate.toLocaleDateString('en-GB'),
                        capPhepKhoaHoc: capPhepKhoaHoc
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
                            label: "Ngày tạo",
                            field: "createdAt",
                            width: 5
                        },
                        {
                            label: "Đã chỉnh sửa",
                            field: "updatedAt",
                            width: 5
                        },
                        {
                            label: "Cấp phép",
                            field: "capPhepKhoaHoc",
                            width: 5
                        },
                    ],
                    rows: listKhoaHocItems
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
                //     history.push(`${match.url}/${listKhoaHocItems[position].nhomKhoaHoc}/khoahoc/${listKhoaHocItems[position].khoaHocId}/capphep`)
                // }
            }
        }



        return (
            <div>
                <Button className="m-0 mb-2" onClick={this.toggle}>Thêm nhóm</Button>
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
                <div className="row">
                    <div className="col-md-2">
                        <p>Chọn nhóm</p>
                    </div>
                    <div className="col-md-7">
                        <select
                            id="selectNhomKhoaHoc"
                            className="browser-default custom-select m-0"
                            defaultValue="key"
                            onChange={this.handlerInputChange}
                        >
                            <option selected disabled value="">Chọn nhóm khóa học</option>
                            {optionNhomKhoaHocs}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <Button className="py-2 px-3 m-0"onClick={this.toggleKhoaHoc}>Thêm khóa học</Button>
                    </div>
                </div>


                <div className="mt-3">
                    {table  }
                </div>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <form onSubmit={this.handlerPostNhomKhoaHoc}>
                    <ModalHeader toggle={this.toggle}>Thêm nhóm khóa học</ModalHeader>
                    <ModalBody>
                        <Input
                            label="Tên nhóm"
                            id="name"
                            onChange={this.handlerInputChange}
                            required
                            value={this.state.name}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Hủy</Button>{' '}
                        <Button type="submit" color="primary">Tạo Ngay</Button>
                    </ModalFooter>
                </form>
                </Modal>

                <Modal isOpen={this.state.modalKhoaHoc} toggle={this.toggleKhoaHoc} size="lg">
                    <form onSubmit={this.handlerPostKhoaHoc}>
                    <ModalHeader toggle={this.toggleKhoaHoc}>Thêm khóa học</ModalHeader>
                    <ModalBody>
                        <select id="nhomKhoaHoc"
                            className="browser-default custom-select m-0"
                            onChange={this.handlerInputChange}
                            defaultValue=""
                            required
                        >
                            <option selected disabled value="">Chọn nhóm khóa học</option>
                            {optionNhomKhoaHocs}
                        </select>
                        <Input
                            label="Tên khóa học"
                            id="nameKhoaHoc"
                            onChange={this.handlerInputChange}
                            required
                            value={this.state.nameKhoaHoc}
                        />
                        <Input
                            label="Mã khóa học"
                            id="codeKhoaHoc"
                            onChange={this.handlerInputChange}
                            required
                            value={this.state.codeKhoaHoc}
                        />

                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleKhoaHoc}>Hủy</Button>{' '}
                        <Button type="submit" color="primary">Tạo Ngay</Button>
                    </ModalFooter>
                </form>
                </Modal>
            </div>
        )
    }
}


export default withRouter(ManagerCoQuanQuanLyKhoaHoc);
