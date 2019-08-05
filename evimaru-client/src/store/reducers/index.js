import {combineReducers} from "redux";
import currentUser from "./currentUser";
import userInformation from "./user-information"
import coQuanQuanLys from "./co-quan-quan-ly";
import nhomKhoaHocs from "./nhom-khoa-hoc"
import coSoDaoTaos from "./co-so-dao-taos";
import coSoDaoTao from "./co-so-dao-tao";
import guest from "./guest-co-so-dao-tao";
import baiHoc from "./bai-hoc";
import baiKiemTra from "./bai-kiem-tra";
import khoaHocs from "./khoa-hoc";
import search from "./search";
import success from "./success";
import errors from "./errors";


const rootReducer = combineReducers({
    currentUser,
    userInformation,
    coQuanQuanLys,
    nhomKhoaHocs,
    coSoDaoTaos,
    coSoDaoTao,
    guest,
    baiHoc,
    baiKiemTra,
    khoaHocs,
    search,
    success,
    errors,
});

export default rootReducer;
