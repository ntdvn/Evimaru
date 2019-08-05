require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const codeRoutes = require("./routes/code");
const usersRoutes = require("./routes/users");
const userInformationRoutes = require("./routes/user-information");

const searchRouter = require("./routes/search");

const coQuanQuanLyRoutes = require("./routes/co-quan-quan-ly")
const nhomKhoaHocRoutes = require("./routes/nhom-khoa-hoc");
const khoaHocRoutes = require("./routes/khoa-hoc");
const capPhepKhoaHocRoutes = require("./routes/cap-phep-khoa-hoc");

const dangKyHocRoutes = require("./routes/dang-ky-hoc");
const khoaHocDangKyRoutes = require("./routes/khoa-hoc-dang-ky");

const coSoDaoTaoRoutes = require("./routes/co-so-dao-tao");
const khoaHocCapPhepRoutes = require("./routes/khoa-hoc-cap-phep");
const lopHocRoutes = require("./routes/lop-hoc");
const baiHocRoutes = require("./routes/bai-hoc");
const baiKiemTraRoutes = require("./routes/bai-kiem-tra");

const coSoVatChatRoutes = require("./routes/co-so-vat-chat");
const giangVienRoutes = require("./routes/giang-vien");
const taiLieuRoutes = require("./routes/tai-lieu");
const lienHeRoutes = require("./routes/lien-he");

const errorHandler = require("./handlers/error")
const {loginRequired, ensureCorrectUser} = require("./middleware/auth");

// import google api library
var {google} = require("googleapis");
// import google driver
var drive = google.drive("v3");
// import our private key
var key = require("./private_key.json");
// import path * directories calls
var path = require("path");
// import fs * handle data in the file system *
var fs = require("fs");

/*** make the request to retrieve an authorization to work with the Google drive web service ***/
// retrieve a jsonwebtoken
// var jwToken = new google.auth.JWT(
//     key.client_email,
//     null,
//     key.private_key,
//     ["https://www.googleapis.com/auth/drive"],
//     null
// );
//
// jwToken.authorize((authErr) => {
//     if(authErr){
//         console.log("AuthERR" + authErr);
//         return;
//     } else {
//         console.log("AUTHORIZATION GOOGLE");
//     }
// });
//
// /** Make request to the Google drive web service **/
//
// // list file in speciifcs folder
// var parents = "1XGtPNG08NaVneGSxaIjtk4UyxZ0OnY79"
// drive.files.list({
//
//   auth: jwToken,
//   pageSize: 10,
//   q: "'" + parents + "' in parents and trashed=false",
//   fields: 'files(id, name)',
// }, (err, {
//   data
// }) => {
//   if (err) return console.log('The API returned an error: ' + err);
//   const files = data.files;
//   if (files.length) {
//     console.log('Files:');
//     files.map((file) => {
//       console.log(`${file.name} (${file.id})`);
//     });
//   } else {
//     console.log('No files found.');
//   }
// });


const db = require("./models")

const PORT = process.env.PORT || 8081;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api/auth", authRoutes);
app.use("/api/code", codeRoutes);
app.use(
    "/api/users",
    loginRequired,
    usersRoutes
);
app.use(
    "/api/user-information/:userId",
    loginRequired,
    ensureCorrectUser,
    userInformationRoutes
)

app.use(
    "/api/search/",
    // loginRequired,
    // ensureCorrectUser,
    searchRouter
)

app.use(
    "/api/cqql",
    loginRequired,
    // ensureCorrectUser,
    coQuanQuanLyRoutes
)

app.use(
    "/api/nhomkhoahoc",
    loginRequired,
    nhomKhoaHocRoutes
)

app.use(
    "/api/khoahoc",
    // loginRequired,
    khoaHocRoutes
)

app.use(
    "/api/capphep/:khoaHocId",
    loginRequired,
    capPhepKhoaHocRoutes
)

app.use(
    "/api/dangky/user/:userId/dangky/khoahoc/:khoaHocCapPhepId/lophoc/:lopHocId",
    loginRequired,
    // ensureCorrectUser,
    dangKyHocRoutes
)

app.use(
    "/api/khoahocdangky/:khoaHocDangKyId",
    loginRequired,
    khoaHocDangKyRoutes
)

app.use(
    "/api/csdt",
    // loginRequired,
    // ensureCorrectUser,
    coSoDaoTaoRoutes
)

app.use(
    '/api/csdt/:csdtId/csvc',
    loginRequired,
    coSoVatChatRoutes
);

app.use(
    '/api/khoahoccapphep/:khoaHocCapPhepId',
    loginRequired,
    khoaHocCapPhepRoutes
);

app.use(
    '/api/lophoc/:lopHocId',
    loginRequired,
    lopHocRoutes
);

app.use(
    '/api/baihoc',
    loginRequired,
    baiHocRoutes
);

app.use(
    '/api/baikiemtra',
    loginRequired,
    baiKiemTraRoutes
);

app.use(
    '/api/csdt/:csdtId/giangvien',
    loginRequired,
    giangVienRoutes
);

app.use(
    '/api/khoahoccapphep/:khoaHocCapPhepId/tailieu',
    loginRequired,
    taiLieuRoutes
);

app.use(
    '/api/csdt/:csdtId/lienhe',
    loginRequired,
    lienHeRoutes
);



app.use((req, res, next) => {
    let error = new Error("Page not Found");
    error.status = 404;
    next(error);
})

app.use(errorHandler);

app.listen(PORT, () => {
    console.log("SERVER STARTING AT ", PORT);
})
