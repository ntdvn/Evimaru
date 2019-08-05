import React from "react";
import { MDBBtn, Button } from "mdbreact";
import { Link } from "react-router-dom";
import TableDropDown from "../components/TableDropDown";
import TableCSVCDropDown from "../components/TableCSVCDropDown";
import TableManagerKhoaHocDropDown from "../components/TableManagerKhoaHocDropDown";
import ButtonCapPhep from "../components/ButtonCapPhep";
var moment = require('moment');

export function tableCqql(dataAPI, remove, update, fieldPost) {
    let tableColumns = {
        columns: [
            {
                label: "Số thứ tự",
                field: "order",
                width: 10
            },
            {
                label: "Tên cơ quan quản lý",
                field: "name",
                width: 200
            },
            {
                label: "Mã",
                field: "code",
                width: 100
            },
            {
                label: "Tùy chọn",
                field: "button",
                width: 10
            }
        ]
    }
    var data = dataAPI.map((r, i) => {
        return {
            order: i,
            ten: r.name,
            code: r.code,
            button:
                <TableDropDown
                    key={r._id}
                    fieldPost={fieldPost}
                    id={r._id}
                    remove={remove.bind(this, r._id)}
                    update={update.bind(this)}
                />,
        }
    })
    var allData = {
        ...tableColumns,
        rows: data
    }
    return allData;
}

export function tableCsdt(dataAPI, remove, update, fieldPost) {
    let tableColumns = {
        columns: [
            {
                label: "STT",
                field: "order",
                width: 10
            },
            {
                label: "ten",
                field: "name",
                width: 200
            },
            {
                label: "code",
                field: "code",
                width: 100
            },
            {
                label: "button",
                field: "button",
                width: 10
            }
        ]
    }
    var data = dataAPI.map((r, i) => {
        return {
            order: i,
            ten: r.name,
            code: r.code,
            button:
                <TableDropDown
                    fieldPost={fieldPost}
                    id={r._id}
                    remove={remove.bind(this, r._id)}
                    update={update.bind(this)}
                />,
        }
    })
    var allData = {
        ...tableColumns,
        rows: data
    }
    return allData;
}

export function tableManagerCSVC(dataAPI, remove, update, fieldPost) {
    let tableColumns = {
        columns: [
            {
                label: "STT",
                field: "order",
                width: 10
            },
            {
                label: "Tên",
                field: "name",
                width: 200
            },
            {
                label: "Loại",
                field: "type",
                width: 100
            },
            {
                label: "Mô tả",
                field: "detail",
                width: 10
            },
            {
                label: "Số lượng",
                field: "quantity",
                width: 10
            },
            {
                label: "Tình trạng",
                field: "condition",
                width: 10
            },
            {
                label: "Tùy chọn",
                field: "button",
                width: 10
            }
        ]
    }
    var data = dataAPI.map((r, i) => {
        return {
            order: i,
            name: r.name,
            type: r.type,
            detail: r.detail,
            quantity: r.quantity,
            condition: r.condition,
            button:
                <TableCSVCDropDown
                    fieldPost={fieldPost}
                    id={r._id}
                    remove={remove.bind(this, r._id)}
                    update={update.bind(this)}
                />,
        }
    })
    var allData = {
        ...tableColumns,
        rows: data
    }
    return allData;
}

export function tableCoSoVatChat(dataAPI) {
    let tableColumns = {
        columns: [
            {
                label: "STT",
                field: "order",
                width: 10
            },
            {
                label: "Tên",
                field: "name",
                width: 200
            },
            {
                label: "Loại",
                field: "type",
                width: 100
            },
            {
                label: "Mô tả",
                field: "detail",
                width: 10
            },
            {
                label: "Số lượng",
                field: "quantity",
                width: 10
            },
            {
                label: "Tình trạng",
                field: "condition",
                width: 10
            },
        ]
    }
    var data = dataAPI.map((r, i) => {
        return {
            order: i,
            name: r.name,
            type: r.type,
            detail: r.detail,
            quantity: r.quantity,
            condition: r.condition,
        }
    })
    var allData = {
        ...tableColumns,
        rows: data
    }
    return allData;
}
export function tableManagerKhoaHoc(dataAPI, coSoDaoTaos, capPhep) {
    // console.log(coSoDaoTaos);
    let tableColumns = {
        columns: [
            {
                label: "STT",
                field: "order",
                width: 10
            },
            {
                label: "Tên khóa học",
                field: "name",
                width: 100
            },
            {
                label: "Mã",
                field: "code",
                width: 100
            },
            {
                label: "Cấp phép",
                field: "button",
                width: 100
            },
            {
                label: "tùy chọn",
                field: "dropdown",
                width: 100
            },
        ]
    }
    var data = dataAPI.map((r, i) => {
        return {
            order: i,
            name: r.name,
            code: r.code,
            button:
                <ButtonCapPhep
                    id={r._id}
                    coSoDaoTaos={coSoDaoTaos}
                    capPhep={capPhep.bind(this)}
                />,
            dropdown:
                <TableManagerKhoaHocDropDown
                    // fieldPost={fieldPost}
                    // id={r._id}
                    // remove={remove.bind(this, r._id)}
                    // update={update.bind(this)}
                />,
        }
    })
    var allData = {
        ...tableColumns,
        rows: data
    }
    return allData;
}

export function tableKhoaHoc(dataAPI) {
    let tableColumns = {
        columns: [
            {
                label: "STT",
                field: "order",
                width: 10
            },
            {
                label: "Tên",
                field: "name",
                width: 10
            },
            {
                label: "Mã",
                field: "code",
                width: 10
            },
            {
                label: "Ngày được cấp",
                field: "ngayDuocCap",
                width: 10
            },
            {
                label: "Ngày hết hạn",
                field: "ngayHetHan",
                width: 100
            },
            {
                label: "Tình trạng",
                field: "tinhTrang",
                width: 100
            },
            {
                label: "Lớp",
                field: "lop",
                width: 100
            },
        ]
    }
    // console.log(dataAPI);
    var data = dataAPI.map((r, i) => {
        let ngayDuocCap = new Date(r.ngayDuocCap);
        let ngayHetHan = new Date(r.ngayHetHan);
        var tinhTrang = ngayDuocCap>=ngayHetHan ? "Đã hết hạn" : "Được cấp phép";
        var lop = ngayDuocCap>=ngayHetHan ?
                <button to="/" type="button" className="btn btn-primary border-0" disabled >Đã hết hạn</button> :
                    <Link to="/" type="button" className="btn btn-primary" >Xem</Link>;
        return {
            order: i,
            name: r.name,
            code: r.code,
            ngayDuocCap: moment((r.ngayDuocCap)).format('DD-MM-YYYY'),
            ngayHetHan: moment((r.ngayHetHan)).format('DD-MM-YYYY'),
            tinhTrang: tinhTrang,
            lop: lop,
        }
    })
    var allData = {
        ...tableColumns,
        rows: data
    }
    return allData;
}

export function tableManagerKhoaHocCapPhep(dataAPI) {
    let tableColumns = {
        columns: [
            {
                label: "STT",
                field: "order",
                width: 10
            },
            {
                label: "Tên",
                field: "name",
                width: 10
            },
            {
                label: "Mã",
                field: "code",
                width: 10
            },
            {
                label: "Ngày được cấp",
                field: "ngayDuocCap",
                width: 10
            },
            {
                label: "Ngày hết hạn",
                field: "ngayHetHan",
                width: 100
            },
            {
                label: "Tình trạng",
                field: "tinhTrang",
                width: 100
            },
            {
                label: "Lớp",
                field: "lop",
                width: 100
            },
        ]
    }
    // console.log(dataAPI);
    var data = dataAPI.map((r, i) => {
        let ngayDuocCap = new Date(r.ngayDuocCap);
        let ngayHetHan = new Date(r.ngayHetHan);
        var tinhTrang = ngayDuocCap>=ngayHetHan ? "Đã hết hạn" : "Được cấp phép";
        var lop = ngayDuocCap>=ngayHetHan ?
                <button to="/" type="button" className="btn btn-primary border-0" disabled >Đã hết hạn</button> :
                    <Link to="/" type="button" className="btn btn-primary" >Xem</Link>;
        return {
            order: i,
            name: r.name,
            code: r.code,
            ngayDuocCap: moment((r.ngayDuocCap)).format('DD-MM-YYYY'),
            ngayHetHan: moment((r.ngayHetHan)).format('DD-MM-YYYY'),
            tinhTrang: tinhTrang,
            lop: lop,
        }
    })
    var allData = {
        ...tableColumns,
        rows: data
    }
    return allData;
}

export function tableManagerGiangVien(dataAPI) {
    let tableColumns = {
        columns: [
            {
                label: "STT",
                field: "order",
                width: 10
            },
            {
                label: "Tên",
                field: "hoTen",
                width: 200
            },
            {
                label: "Ngày sinh",
                field: "ngaySinh",
                width: 50
            },
            {
                label: "Học hàm",
                field: "hocHam",
                width: 10
            },
            {
                label: "Học vị",
                field: "hocVi",
                width: 10
            },
            {
                label: "Môn học",
                field: "monHoc",
                width: 10
            },
            {
                label: "Chứng chỉ",
                field: "chungChi",
                width: 10
            },
            {
                label: "Chi tiết",
                field: "chiTiet",
                width: 10
            },
        ]
    }
    var data = dataAPI.map((r, i) => {
        var monHocs = r.monHoc.map((monHoc, i) => {
            return <Button className="p-1 ml-1">{monHoc}</Button>
        })
        return {
            order: i,
            hoTen: r.hoTen,
            ngaySinh: r.ngaySinh,
            hocHam: r.hocHam,
            hocVi: r.hocVi,
            monHoc: monHocs,
            tiengAnh: r.tiengAnh,
            tinHoc: r.tinHoc,
        }
    })
    var allData = {
        ...tableColumns,
        rows: data
    }
    return allData;
}
