import { LOAD_NHOM_KHOA_HOC, CREATE_NHOM_KHOA_HOC, UPDATE_NHOM_KHOA_HOC,
    REMOVE_NHOM_KHOA_HOC, CREATE_KHOA_HOC, UPDATE_KHOA_HOC, REMOVE_KHOA_HOC } from "../actionTypes";

const nhomKhoaHocs =  (state = {}, action) => {
    switch(action.type) {
        case LOAD_NHOM_KHOA_HOC:
            return [...action.nhomKhoaHocs];
        case CREATE_NHOM_KHOA_HOC:
            return [...state, action.nhomKhoaHoc];
        case CREATE_KHOA_HOC:
            console.log(action.khoaHoc);
            return state.map(nhomKhoaHoc => {
                if(nhomKhoaHoc.name === action.khoaHoc.nhomKhoaHoc.name){
                    nhomKhoaHoc.khoaHoc.push(action.khoaHoc)

                }
                 return nhomKhoaHoc;
            });
        // case UPDATE_NHOM_KHOA_HOC:
        //     return state.map(nhomKhoaHoc => {
        //        if(nhomKhoaHoc._id === action.nhomKhoaHocId) return action.csdt;
        //        else return csdt
        //     });
        // case REMOVE_NHOM_KHOA_HOC:
        //     return state.filter(csdt => csdt._id !== action.csdt_id)
        default:
            return state;
    }
}

export default nhomKhoaHocs;
