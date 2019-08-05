import React, { Component } from "react";
import defaultTeacher from "../images/default_teacher.png";
import { Button } from "mdbreact";

class GiangVienItem extends Component {
    constructor(props){
        super(props);
    }
    defaultImage(e){
        e.target.src = defaultTeacher
    }
    render() {
        const { giangVien } = this.props;
        // console.log(giangVien);
        var monHocs = giangVien.monHoc.map((monHoc, i) => {
            return <Button className="p-1 ml-1">{monHoc}</Button>
        })
        return (
            <div className="">
                <div className="row p-0 m-0">
                    <div className="col-md-3 p-0 m-0">
                        <img
                            src={giangVien.imageUrl||defaultTeacher}
                            alt="IMG NOT FOUND"
                            className="img-thumbnail img-fluid"
                            onError={this.defaultImage}
                            style={{width: "100%", height: "200px"}}
                        />
                    </div>
                    <div className="col-md-9 p-0 m-0 pl-3">
                        <h3>{giangVien.hoTen} ({giangVien.ngaySinh})</h3>
                            <div className="row p-0 m-0">
                                <div className="col-md-4 p-0 m-0">
                                    <div><strong>Học vị: </strong>{giangVien.hocVi}</div>
                                    <div><strong>Học hàm: </strong>{giangVien.hocHam}</div>
                                    <div><strong>Tiếng anh: </strong>{giangVien.tiengAnh}</div>
                                    <div><strong>Tin Học: </strong>{giangVien.tinHoc}</div>
                                </div>
                                <div className="col-md-6 p-0 m-0">
                                    <div><strong>Chứng chỉ: </strong>{giangVien.chungChi}</div>
                                    <div><strong>Môn học: </strong></div>
                                    {monHocs}
                                </div>
                            </div>
                    </div>
                </div>
                <hr className="style-two"/>
            </div>
        )
    }
}

export default GiangVienItem;
