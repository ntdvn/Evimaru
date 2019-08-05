import React, { Component } from "react";
import { withRouter } from "react-router-dom"
import { Input, Button, MDBDataTable } from "mdbreact";
import NavbarBackLink from "../components/NavbarBackLink";
import MyDefaultStyleTable from "./MyDefaultStyleTable";
import { JSONisEmpty, getIdFromArray, getDateTimeFromData } from "../services/multifunctional";
class ManagerCoSoDaoTaoClass extends Component {
    constructor(props){
        super(props);
        const thisLopHoc = getIdFromArray(this.props.match.params.classId, this.props.khoaHoc.lopHoc);
        console.log(this.props.match);
        this.state = {
            tenLop: thisLopHoc.tenLop,
            soQuyetDinh: thisLopHoc.soQuyetDinh,
            description: thisLopHoc.description,
            ngayBatDau: thisLopHoc.thoiGian.ngayBatDau,
            ngayKetThuc: thisLopHoc.thoiGian.ngayKetThuc,
            buoiHocArr: thisLopHoc.thoiGian.buoiHoc,
            ngayHoc: "Thứ 2",
            gioHoc: "",
            giangVienArr: thisLopHoc.giangVien,
            gioiHanHocVien: thisLopHoc.gioiHanHocVien,

            checkPostLopHoc: [],

        }
    }
    handlerInputChange = e => {
        this.setState({[e.target.id]: e.target.value})
    }

    handlerAdd = (inputName, arrayName) => {
        this.setState({[arrayName]: [...this.state[arrayName], this.state[inputName]]});
        this.setState({[inputName]: ""});
    }

    handlerRemove = (arrayName, index) => {
        var array = this.state[arrayName];
        array = array.filter((item, i) => {
            if(i!=index) return item;
        })
        this.setState({[arrayName]: array});
    }

    handlerAddBuoiHoc = (e) => {
        e.preventDefault();
        var data = {
            ngayHoc: this.state.ngayHoc,
            gioHoc: this.state.gioHoc,
        }
        this.setState({buoiHocArr: [...this.state.buoiHocArr, data]});
        this.setState({ngayHoc: "Thứ 2", gioHoc: ""});

    }

    handlerListCheck = e => {
       const options = this.state.giangVienArr
       let index;
       if (e.target.checked) {
         options.push(e.target.value)
       } else {
         index = options.indexOf(e.target.value)
         options.splice(index, 1)
       }
       // console.log(e.target.value);
       this.setState({ giangVienArr: options })
    }

    handlerPostLopHoc = id =>  {
        let { tenLop, soQuyetDinh, description, ngayBatDau, ngayKetThuc, buoiHocArr, giangVienArr, gioiHanHocVien } = this.state;
        let errorArr,arrayResult=[];
        let checkError = false;
        errorArr = [
            "Bạn phải nhập tên bài lớp học",
            "Bạn phải số quyết định",
            "Bạn phải nhập đầy đủ thời gian học",
            "Bạn phải thêm buổi học trên lớp cho khóa học",
            "Bạn phải thêm ít nhất 1 giảng viên phụ trách lớp"
        ];

        if(tenLop==""){
           if(!arrayResult.includes(errorArr[0])){
               arrayResult=[...arrayResult, errorArr[0]];
               checkError=true;
           }
        }

        if(soQuyetDinh==""){
            if(!arrayResult.includes(errorArr[1])){
                arrayResult=[...arrayResult, errorArr[1]];
                checkError=true;
            }
        }

        if(ngayBatDau=="" || ngayKetThuc==""){
            if(!arrayResult.includes(errorArr[2])){
                arrayResult=[...arrayResult, errorArr[2]];
                checkError=true;
            }
        }

        if(buoiHocArr.length==0){
            if(!arrayResult.includes(errorArr[3])){
                arrayResult=[...arrayResult, errorArr[3]];
                checkError=true;
            }
        }

        if(giangVienArr.length==0){
            if(!arrayResult.includes(errorArr[4])){
                arrayResult=[...arrayResult, errorArr[4]];
                checkError=true;
            }
        }


        this.setState({checkPostLopHoc: arrayResult})

        if(checkError==false){
            this.props.postLopHoc(
                id,
                {
                    tenLop: tenLop,
                    soQuyetDinh: soQuyetDinh,
                    description: description,
                    thoiGian: {
                        ngayBatDau: ngayBatDau,
                        ngayKetThuc: ngayKetThuc,
                        buoiHoc: buoiHocArr
                    },
                    giangVienArr: giangVienArr,
                    gioiHanHocVien: gioiHanHocVien
                }
            )
            this.setState({
                tenLop: "",
                soQuyetDinh: "",
                description: "",
                ngayBatDau: "",
                ngayKetThuc: "",
                buoiHocArr: [],
                ngayHoc: "Thứ 2",
                gioHoc: "",
                giangVienArr: [],

                checkPostLopHoc: []
            })
        }

        setTimeout((() => {
            this.setState({ checkPostLopHoc: []})
        }).bind(this), 3000);
    }

    componentWillReceiveProps(nextProps) {

    }
    render() {
        const { khoaHoc, nhomKhoaHoc, coSoDaoTao, success, errors, match } = this.props;
        const { buoiHocArr, handlerListCheck, checkPostLopHoc } = this.state;
        var listCauHoi, listBuoiHoc, listGiangVien, lopHoc, dataGiangViens, thisLopHoc, table, data;
        // console.log(match);
        if(!JSONisEmpty(khoaHoc)){
            if(khoaHoc.hasOwnProperty('lopHoc')){
                const { lopHoc } = khoaHoc;
                thisLopHoc = getIdFromArray(match.params.classId, lopHoc)
                // console.log(thisLopHoc);
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
                        name: "Lớp học",
                        link: `/user/manager/nhomkhoahoc/${nhomKhoaHoc._id}/khoahoc/${khoaHoc._id}/information/class`,
                    },
                    {
                        name: `${thisLopHoc.tenLop} - Chi tiết`,
                        link: `/user/manager/nhomkhoahoc/${nhomKhoaHoc._id}/khoahoc/${khoaHoc._id}/information/class/${thisLopHoc._id}`,
                    },
                ]
                let dayArr = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"];
                var daySelectionList = dayArr.map((d, i) => (
                    <option key={i} value={d}>{d}</option>
                ))
                if(coSoDaoTao.hasOwnProperty('danhSachGiangVien')){

                    dataGiangViens = thisLopHoc.giangVien.map((giangVien, i) => {
                        let checkBoxStyle = {fontSize: "110%", display: "inline"}
                        let ngaySinhDate = new Date(giangVien.userInformation.ngaySinh).toLocaleDateString('en-GB');
                        let monHocs = giangVien.userInformation.monHoc.map((monHoc, i) => (
                            <div>{monHoc}</div>
                        ))
                        let phuTrachLopNay =
                            <div className="check-box-giangvien-container">
                                <input
                                    type="checkbox"
                                    id={`giangvien+${i}`}
                                    className="check-box-giangvien"
                                    value={giangVien._id}
                                    onChange={this.handlerListCheck}
                                />
                            </div>

                        return {
                            ten: giangVien.userInformation.hoTen,
                            ngaySinh: ngaySinhDate,
                            hocHam: giangVien.userInformation.hocHam,
                            hocVi: giangVien.userInformation.hocVi,
                            tiengAnh: giangVien.userInformation.tiengAnh,
                            tinHoc: giangVien.userInformation.tinHoc,
                            monHoc: monHocs,
                        }
                    })

                    data = {
                        columns: [
                            {
                                label: "Tên giảng viên",
                                field: "ten",
                                width: 5
                            },
                            {
                                label: "Ngày sinh",
                                field: "ngaySinh",
                                width: 5
                            },
                            {
                                label: "Học hàm",
                                field: "hocHam",
                                width: 5
                            },
                            {
                                label: "Học vị",
                                field: "hocVi",
                                width: 5
                            },
                            {
                                label: "Tiếng Anh",
                                field: "tiengAnh",
                                width: 5
                            },
                            {
                                label: "Tin học",
                                field: "tinHoc",
                                width: 5
                            },
                            {
                                label: "Môn học",
                                field: "monHoc",
                                width: 5
                            },
                        ],
                        rows: dataGiangViens
                    }

                    table = <div className="mt-3 text-wrap">
                        <MDBDataTable
                            reponsive="true"
                            bordered
                            hover
                            data={data}
                        />
                    </div>

                }
                // console.log(coSoDaoTao.danhSachGiangVien);
                listBuoiHoc = buoiHocArr.map((b, i) => (
                    <li className="mb-3" key={i}>
                        {b.ngayHoc} + {b.gioHoc}
                        <Button
                            color="red"
                            className="p-2 px-3 m-0 float-right"
                            onClick={this.handlerRemove.bind(this, "buoiHocArr", i)}
                        >
                            X
                        </Button>
                    </li>
                ))

                var listError, errorPanel;
                listError = checkPostLopHoc.map((error, i) => (
                    <div><strong>!</strong> {error}</div>
                ))
                errorPanel = listError.length!=0?
                <div className="alert alert-danger" role="alert">
                    {listError}
                </div>: <div></div>



                return (
                    <div>
                        <NavbarBackLink
                            backLinkArr={backLinkArr}
                        />
                        <h3>KHÓA HỌC: {khoaHoc.name}</h3>

                        <div className="row mb-3">
                            <div className="container-fluid what-you-learn-container mb-3">
                                <h3>Tên lớp học:</h3>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="col-md-12">
                                            <Input
                                                label="Đặt tên lớp học"
                                                id="tenLop"
                                                type="textarea"
                                                onChange={this.handlerInputChange}
                                                value={this.state.tenLop}
                                                rows="4"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="container-fluid what-you-learn-container mb-3">
                                <h3>Ghi chú lớp học</h3>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="col-md-12">
                                            <Input
                                                label="Ghi chú về lớp học"
                                                id="description"
                                                type="textarea"
                                                onChange={this.handlerInputChange}
                                                value={this.state.description}
                                                rows="4"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="container-fluid what-you-learn-container mb-3">
                                <h3>Thời gian tham gia lớp học:</h3>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="input-ngayBatDau">Ngày bắt đầu</span>
                                            </div>
                                            <input
                                                id="ngayBatDau"
                                                type="date"
                                                data-date-format="DD MMMM YYYY"
                                                data-date=""
                                                min="2010-01-01"
                                                max="2030-01-01"
                                                className="form-control"
                                                aria-label="Ngày bắt đầu"
                                                aria-describedby="input-ngayBatDau"
                                                onChange={this.handlerInputChange}
                                                value={this.state.ngayBatDau}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="input-ngayketthuc">Ngày kết thúc</span>
                                            </div>
                                            <input
                                                id="ngayKetThuc"
                                                type="date"
                                                data-date-format="DD MMMM YYYY"
                                                data-date=""
                                                min="2010-01-01"
                                                max="2030-01-01"
                                                className="form-control"
                                                aria-label="Ngày kết thúc"
                                                aria-describedby="input-ngayketthuc"
                                                onChange={this.handlerInputChange}
                                                value={this.state.ngayKetThuc}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <h4>Thời gian học trên lớp:</h4>
                                <form onSubmit={this.handlerAddBuoiHoc}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="input-date">Chọn học thứ mấy</span>
                                            </div>
                                            <select
                                                className="browser-default custom-select"
                                                id="ngayHoc"
                                                aria-label="Chọn học thứ mấy"
                                                aria-describedby="input-date"
                                                onChange={this.handlerInputChange}
                                                value={this.state.ngayHoc}
                                            >
                                                {daySelectionList}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="input-giohoc">Giờ học</span>
                                            </div>
                                            <input
                                                id="gioHoc"
                                                type="time"
                                                className="form-control"
                                                aria-label="Giờ học"
                                                aria-describedby="input-giohoc"
                                                onChange={this.handlerInputChange}
                                                value={this.state.gioHoc}
                                                required
                                            />
                                        </div>
                                    </div>

                                </div>
                                <Button type="submit">Thêm thời gian học</Button>
                                </form>
                                {listBuoiHoc}
                            </div>

                            <div className="container-fluid what-you-learn-container mb-3">
                                <h3>Số quyết định</h3>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="input-soquyetdinh">Số quyết định</span>
                                            </div>
                                            <input
                                                id="soQuyetDinh"
                                                type="text"
                                                className="form-control"
                                                placeholder="Số quyết định"
                                                aria-label="Số quyết định"
                                                aria-describedby="input-hocvi"
                                                onChange={this.handlerInputChange}
                                                value={this.state.soQuyetDinh}
                                                required
                                             />
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="input-giohanhocvien">Số học viên tối đa</span>
                                            </div>
                                            <input
                                                id="gioiHanHocVien"
                                                type="text"
                                                className="form-control"
                                                placeholder="Số học viên tối đa"
                                                aria-label="Số học viên tối đa"
                                                aria-describedby="input-giohanhocvien"
                                                onChange={this.handlerInputChange}
                                                value={this.state.gioiHanHocVien}
                                                required
                                             />
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="col-md-12">
                                <h3>Giảng viên phụ trách lớp: </h3>
                                <div>{table}</div>
                            </div>

                        </div>
                        { errorPanel }
                        <Button color="primary" onClick={this.handlerPostLopHoc.bind(this, khoaHoc._id)}>Sửa thông tin lớp</Button>
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
                    </div>
                )
            }

        } else {
            return <div>ERROR</div>
        }
    }
}

export default withRouter(ManagerCoSoDaoTaoClass);
