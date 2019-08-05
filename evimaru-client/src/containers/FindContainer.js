import React, { Component } from "react";
import { Switch, Route, withRouter, Link } from "react-router-dom";
import { Animation, Navbar, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse,Container,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Input, MDBDataTable, Modal,
    ModalHeader, ModalBody, ModalFooter } from "mdbreact";
import MyDefaultStyleTable from "../components/MyDefaultStyleTable";
import {JSONisEmpty} from "../services/multifunctional";

class FindContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            hoTen: "",
            result: "",
            modal: false,
            userSearchSelected: ""
        };

    }
    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    onSelectedUserResult = (search) => {
        this.setState({userSearchSelected: search})
        this.toggleModal();
    }

    handlerInputChangeUser = e => {
        this.setState({[e.target.id]: e.target.value}, () => {
            this.props.fetchSearchUserByName({hoTen: this.state.hoTen})
        })
    }

    handlerInputChangeKhoaHoc = e => {
        this.setState({[e.target.id]: e.target.value}, () => {
            this.props.fetchSearchKhoaHocByName({khoaHoc: this.state.khoaHoc})
        })

    }

    toggle(toggleNameOpen, toggleNameClose){
        this.setState({
            [toggleNameOpen]: !this.state[toggleNameOpen],
            [toggleNameClose]: false,
        });
    }

    // handlerPostSearch = (e) => {
    //     e.preventDefault();
    //     this.props.fetchSearchUserByName({hoTen: this.state.hoTen})
    // }
    render() {
        const { match, search, khoaHocs } = this.props;
        const { userSearchSelected } = this.state;
        var khoaHocDangKyList, dataKhoaHocDangKy, tableKhoaHocDangKy;
        var resultUser, resultKhoaHoc, optionKhoaHocs;
        var dataUser, tableUser, dataKhoaHoc, tableKhoaHoc;
        if(!JSONisEmpty(search)){
            if(search.hasOwnProperty('user')){

                const { user } = search;
                resultUser = user.map((search, i) => {
                    let chiTiet;
                    let ngaySinhDate = new Date(search.ngaySinh).toLocaleDateString('en-GB');
                    chiTiet = <Button onClick={this.onSelectedUserResult.bind(this, search)}>Chi tiết</Button>

                    return {
                        hoTen: search.hoTen,
                        ngaySinh: ngaySinhDate,
                        queQuan: search.queQuan,
                        quocTich: search.quocTich,
                        idNumber: search.idNumber,
                        maSoThuyenVien: search.maSoThuyenVien,
                        chiTiet: chiTiet,
                    }
                })

                dataUser = {
                    columns: [
                        {
                            label: "Tên",
                            field: "hoTen",
                            width: 5
                        },
                        {
                            label: "Ngày sinh",
                            field: "ngaySinh",
                            width: 5
                        },
                        {
                            label: "Quê quán",
                            field: "hocHam",
                            width: 5
                        },
                        {
                            label: "Quốc tịch",
                            field: "quocTich",
                            width: 5
                        },
                        {
                            label: "idNumber",
                            field: "idNumber",
                            width: 5
                        },
                        {
                            label: "Mã số TV",
                            field: "maSoThuyenVien",
                            width: 5
                        },
                        {
                            label: "Chi tiết",
                            field: "chiTiet",
                            width: 5
                        },

                    ],
                    rows: resultUser
                }
                tableUser = <div className="mt-3 text-wrap">
                    <MDBDataTable
                        reponsive="true"
                        bordered
                        hover
                        data={dataUser}
                    />
                </div>
            }
            if(!JSONisEmpty(userSearchSelected)){
                console.log(userSearchSelected);
                if(!JSONisEmpty(userSearchSelected.user.khoaHocDangKy)){
                    khoaHocDangKyList = userSearchSelected.user.khoaHocDangKy.map((khdk, i) => {
                        let thoiHan, thoiGianHoc;
                        thoiHan = new Date(khdk.ngayCapChungChi).getFullYear() + " -> " + new Date(khdk.ngayHetHanChungChi).getFullYear();
                        thoiGianHoc = new Date(khdk.lopHoc.thoiGian.ngayBatDau).toLocaleDateString("en-GB") + " -> " + new Date(khdk.lopHoc.thoiGian.ngayKetThuc).toLocaleDateString("en-GB");
                        return {
                            khoaHoc: khdk.khoaHoc.name,
                            coSoDaoTao: khdk.khoaHoc.coSoDaoTao.name,
                            lopHoc: khdk.lopHoc.tenLop,
                            thoiGianHoc: thoiGianHoc,
                            passed: khdk.passed,
                            chungChi: khdk.chungChi,
                            thoiHan: thoiHan,
                        }
                    })
                }
                console.log(userSearchSelected.user.khoaHocDangKy);
                // console.log(khoaHocDangKyList);
                dataKhoaHocDangKy = {
                    columns: [
                        {
                            label: "Khóa học",
                            field: "khoaHoc",
                            width: 5
                        },
                        {
                            label: "Cơ sở đào tạo",
                            field: "coSoDaoTao",
                            width: 5
                        },
                        {
                            label: "Lớp học",
                            field: "lopHoc",
                            width: 5
                        },
                        {
                            label: "Thời gian học",
                            field: "thoiGianHoc",
                            width: 5
                        },
                        {
                            label: "Kết quả",
                            field: "passed",
                            width: 5
                        },
                        {
                            label: "Chứng chỉ",
                            field: "chungChi",
                            width: 5
                        },

                        {
                            label: "Thời hạn",
                            field: "thoiHan",
                            width: 5
                        },
                    ],
                    rows: khoaHocDangKyList
                }
                console.log(khoaHocDangKyList);
                if(khoaHocDangKyList == null){
                    tableKhoaHocDangKy = <div>Học viên chưa tham gia khóa học nào!</div>
                } else {
                    tableKhoaHocDangKy = <div className="mt-3 text-wrap">
                        <MDBDataTable
                            reponsive="true"
                            bordered
                            hover
                            data={dataKhoaHocDangKy}
                        />
                    </div>
                }

            }

        //     countPanel = <div className="search-count-panel">Tìm thấy {search.length} kết quả</div>
        }
        if(!JSONisEmpty(khoaHocs)){//khoaHocs.length>0

            optionKhoaHocs = khoaHocs.map((kh,i) => {
                return (
                    <option value={kh.name} key={kh._id}>{kh.name}</option>
                )
            })
            if(search.hasOwnProperty('khoaHoc')){
                const { khoaHoc } = search;
                resultKhoaHoc = khoaHoc.map((kh, i) => {
                    // console.log(kh);
                    let ngayDuocCapDate, ngayHetHanDate, chiTiet;
                    ngayDuocCapDate = new Date(kh.ngayDuocCap).toLocaleDateString('en-GB');
                    ngayHetHanDate = new Date(kh.ngayHetHan).toLocaleDateString('en-GB');
                    if(kh.activeCourse){
                        chiTiet =
                            <Link
                                style={{outLine:"none"}}
                                className="btn btn-default w-100"
                                to={`/csdt/${kh.coSoDaoTao._id}/nhomkhoahoc/${kh.nhomKhoaHoc}/khoahoc/${kh._id}`}
                            >
                                Chi tiết
                            </Link>
                    } else {
                        chiTiet = <Button color="grey darken-1"className="w-100">Chưa mở</Button>
                    }

                    return {
                        tenKhoaHoc: kh.name,
                        maKhoaHoc: kh.code,
                        coSoDaoTao: kh.coSoDaoTao.name,
                        ngayDuocCap: ngayDuocCapDate,
                        ngayHetHan: ngayHetHanDate,
                        chiTiet: chiTiet
                    }
                })

                dataKhoaHoc = {
                    columns: [
                        {
                            label: "Tên khóa học",
                            field: "tenKhoaHoc",
                            width: 5
                        },
                        {
                            label: "Mã",
                            field: "maKhoaHoc",
                            width: 5
                        },
                        {
                            label: "Cơ sở đào tạo",
                            field: "coSoDaoTao",
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
                            label: "Chi tiết",
                            field: "chiTiet",
                            width: 5
                        },
                    ],
                    rows: resultKhoaHoc
                }

                tableKhoaHoc = <div className="mt-3 text-wrap">
                    <MDBDataTable
                        reponsive="true"
                        bordered
                        hover
                        data={dataKhoaHoc}
                    />
                </div>
            }
        }


        return (
                <div>
                    <div className="group-horizontal-container light-blue darken-2 text-white">
                        <div className="group-horizontal-item" onClick={this.toggle.bind(this, "tiemKiemKhoaHoc", "timkiemhocvien")}>
                            Tìm kiếm khóa học
                        </div>
                        <div className="group-horizontal-item" onClick={this.toggle.bind(this, "timkiemhocvien", "tiemKiemKhoaHoc")}>
                            Tìm kiếm học viên
                        </div>
                    </div>
                    <div>
                        <Collapse isOpen={this.state["tiemKiemKhoaHoc"]}>
                            <div className="mt-2">
                                <select id="khoaHoc"
                                    className="browser-default custom-select m-0"
                                    onChange={this.handlerInputChangeKhoaHoc}
                                    defaultValue=""
                                    required
                                >
                                    <option selected disabled value="">Chọn nhóm khóa học</option>
                                    { optionKhoaHocs }
                                </select>
                            </div>
                            <div className="mt-2">
                                {tableKhoaHoc}
                            </div>
                        </Collapse>

                        <Collapse isOpen={this.state["timkiemhocvien"]}>

                            <div className="mt-2">
                                <form onSubmit={this.handlerPostSearch}>
                                    <Input
                                        label="Nhập tên học viên cần tìm"
                                        id="hoTen"
                                        onChange={this.handlerInputChangeUser}
                                        required
                                        value={this.state.hoTen}
                                    />
                                </form>
                            </div>
                            <div>
                                {tableUser}
                            </div>

                        </Collapse>
                    </div>

                    <Modal isOpen={this.state.modal} toggle={this.toggle} size="fluid">
                        <form onSubmit={this.handlePostCoSoVatChat}>
                            <ModalHeader toggle={this.toggleModal}><strong>Học viên: </strong><i>{userSearchSelected.hoTen}</i></ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Ngày sinh"
                                    value={ new Date(userSearchSelected.ngaySinh).toLocaleDateString("en-GB")}
                                    disabled
                                />
                                <Input
                                    label="Quê quán"
                                    value={userSearchSelected.queQuan}
                                    disabled
                                />
                                <Input
                                    label="Quốc tịch"
                                    value={userSearchSelected.quocTich}
                                    disabled
                                />
                                <Input
                                    label="idNumber"
                                    value={userSearchSelected.idNumber}
                                    disabled
                                />
                                <Input
                                    label="Mã số thuyền viên"
                                    value={userSearchSelected.maSoThuyenVien}
                                    disabled
                                />
                            <h2>Quá trình học: </h2>
                                {tableKhoaHocDangKy}

                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={this.toggleModal}>Đóng</Button>{' '}
                            </ModalFooter>
                        </form>
                    </Modal>
                </div>
        )
    }
}

export default withRouter(FindContainer);
