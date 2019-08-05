import React from "react";
import { MDBDataTable } from "mdbreact";
import { tableGiangVien } from "../services/table";
import { JSONisEmpty } from "../services/multifunctional";
import GiangVienItem from "./GiangVienItem";
import MyDefaultStyleTable from "./MyDefaultStyleTable";

const GiangVien = props => {
    const { coSoDaoTao } = props;
    var data, table;
    if(!JSONisEmpty(coSoDaoTao)){
        if(coSoDaoTao.hasOwnProperty('danhSachGiangVien')){
            if(coSoDaoTao.danhSachGiangVien.hasOwnProperty('giangVien')){
                // console.log(coSoDaoTao.danhSachGiangVien.giangVien);
                var giangViens = coSoDaoTao.danhSachGiangVien.giangVien.map((giangVien, i) => {
                    // console.log(giangVien);
                    var ngaySinh = new Date(giangVien.userInformation.ngaySinh).toLocaleDateString('en-GB');

                    let chungChi = giangVien.userInformation.chungChi.map((chungChi, i) => {
                        return <div>{chungChi}</div>
                    })

                    let monHoc = giangVien.userInformation.monHoc.map((monHoc, i) => {
                        return <div>{monHoc}</div>
                    })
                    return {
                        hoTen: giangVien.userInformation.hoTen,
                        // id: giangVien._id,
                        ngaySinh: ngaySinh,
                        tiengAnh: giangVien.userInformation.tiengAnh,
                        tinHoc: giangVien.userInformation.tinHoc,
                        chungChi: chungChi,
                        hocHam: giangVien.userInformation.hocHam,
                        hocVi: giangVien.userInformation.hocVi,
                        monHoc: monHoc,
                    }
                })

                data = {
                    columns: [
                        {
                            label: "Tên giảng viên",
                            field: "hoTen",
                            width: 15
                        },
                        {
                            label: "Ngày sinh",
                            field: "ngaySinh",
                            width: 10
                        },
                        {
                            label: "Tiếng Anh",
                            field: "tiengAnh",
                            width: 10
                        },
                        {
                            label: "Tin học",
                            field: "tinHoc",
                            width: 10
                        },
                        {
                            label: "Học vị",
                            field: "hocVi",
                            width: 30
                        },
                        {
                            label: "Học hàm",
                            field: "hocHam",
                            width: 10
                        },
                        {
                            label: "Chứng chỉ",
                            field: "chungChi",
                            width: 20
                        },
                        {
                            label: "Môn học phụ trách",
                            field: "monHoc",
                            width: 30
                        },
                    ],
                    rows: giangViens
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
        }
    }
    return (
        <div>
            {table}
        </div>
    )
}

export default GiangVien;
