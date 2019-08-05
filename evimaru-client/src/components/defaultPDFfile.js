import React, { Component } from "react";
import { Button } from "mdbreact";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import UVNBucThu from "../fonts/UVNBucThu.TTF"
import { font } from "../fonts/font"
class ResultPDF extends Component {

    demoFromHTML() {

    const columns = [
        { title: "#", dataKey: "sttCauHoi" },
        { title: "Question", dataKey: "dapAn" },
        { title: "Result", dataKey: "isTrue" },
        // { title: "Country", dataKey: "country" },
    ];
    const { userInformation, khoaHocDangKy, ketLuan, ketQua } = this.props;
    const { khoaHoc, lopHoc, ketQuaHocOnline, updatedAt } = khoaHocDangKy;
    var data = this.props.data;
    var time = this.props.time
    data = data.map((d, i) => {
        return {
            ...d,
            sttCauHoi: i+1
        }
    })
    // const rows = [
    //     {"id": 1, "name": "Shaw", "country": "Tanzania" },
    //     {"id": 2, "name": "Nelson", "country": "Kazakhstan"},
    //     {"id": 3, "name": "Garcia", "country": "Madagascar"},
    // ];

    var doc = new jsPDF('p', 'pt');
    doc.addFileToVFS('UVNBucThu.TTF',font.fontDefault);

doc.addFont('UVNBucThu.TTF', 'custom', 'normal');

doc.setFont('custom');
    doc.autoTable(columns, data, {
        // styles: { fillColor: [120, 255, 255], font: "custom" },
        styles: { font: "custom"},
        columnStyles: {
            id: { fillColor: 255 },
            // font: "custom"
        },
        margin: {top: 165},
        addPageContent: function(data) {
        }
    });
    doc.setFontSize(12);
    doc.text(`Học viên: ${userInformation.hoTen}`, 30, 30);
    doc.text(`Ngày sinh: ${new Date(userInformation.ngaySinh).toLocaleDateString("en-GB")}`, 350, 30);
    doc.text(`Khóa học: ${khoaHoc.name}`, 30, 50);
    doc.text(`Học lớp: ${lopHoc.tenLop} từ ngày ${new Date(lopHoc.thoiGian.ngayBatDau).toLocaleDateString("en-GB")} đến ${new Date(lopHoc.thoiGian.ngayKetThuc).toLocaleDateString("en-GB")}`, 30, 70);
    doc.text(`Tại cơ sở đào tạo: ${khoaHoc.coSoDaoTao.name}`, 30, 90);
    if(ketQua==null){
        doc.text(`Kết quả: ${ketQuaHocOnline.soCauTraLoiDung}/${ketQuaHocOnline.chiTiet.length} câu`, 30, 110);
    } else {
        doc.text(`Kết quả: ${ketQua} câu`, 30, 110);
    }

    doc.text(`Kết luận: ${ketLuan}`, 350, 110);
    doc.text(`CHI TIẾT KẾT QUẢ LÀM BÀI KIỂM TRA:`, 30, 130);
    doc.setFontSize(10);
    doc.text(`Thời điểm làm: ${new Date(updatedAt).toLocaleTimeString("en-GB")} - ${new Date(updatedAt).toLocaleDateString("en-GB")}`, 30, 145);
    // doc.save('table.pdf')
    doc.output('dataurlnewwindow');
    }

    render() {
        // console.log(this.props.data);
        return (
            <div>
                <Button className="m-0 py-2 px-4" onClick={() => this.demoFromHTML()}>kết quả</Button>
            </div>

        );
    }
}
export default ResultPDF;
