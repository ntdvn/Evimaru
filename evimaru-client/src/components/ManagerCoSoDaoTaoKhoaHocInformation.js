import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Input, Button, MDBIcon } from "mdbreact";
import NavbarBackLink from "../components/NavbarBackLink";
import { JSONisEmpty, getIdFromArray } from "../services/multifunctional";

class ManagerCoSoDaoTaoKhoaHocInformation extends Component {
    constructor(props){
        super(props);
        this.state = {
            ...this.props.khoaHoc
            // imageUrl: "",
            // videoUrl: "",
            // introduction: "",
            // whatYouLearn: "",
            // whatYouLearnArr: [],
            // requirements: "",
            // requirementsArr: [],
            // description: "",
            // descriptionArr: [],
            // forUser: "",
            // forUserArr: [],
            // include: "",
            // includeArr: [],
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
    handlerPostChiTietKhoaHoc = () => {
        // console.log();
        this.props.postChiTietKhoaHoc(
            this.props.match.params.khoaHocId,
            {
                imageUrl: this.state.imageUrl,
                videoUrl: this.state.videoUrl,
                introduction: this.state.introduction,
                whatYouLearnArr: this.state.whatYouLearnArr,
                requirementsArr: this.state.requirementsArr,
                descriptionArr: this.state.descriptionArr,
                forUserArr: this.state.forUserArr,
                includeArr: this.state.includeArr
            }
        )
    }

    componentWillReceiveProps(nextProps){
        const { nhomKhoaHoc, khoaHoc, coSoDaoTao, success, errors, match } = nextProps;
        if(!JSONisEmpty(khoaHoc)){
            this.setState({
                imageUrl: khoaHoc.imageUrl,
                videoUrl: khoaHoc.videoUrl,
                introduction: khoaHoc.gioiThieu,
                whatYouLearnArr: khoaHoc.whatYouLearnArr,
                requirementsArr: khoaHoc.requirementsArr,
                descriptionArr: khoaHoc.descriptionArr,
                forUserArr: khoaHoc.forUserArr,
                includeArr: khoaHoc.includeArr
            });
        }
    }

    render() {
        const { nhomKhoaHoc, khoaHoc, coSoDaoTao, success, errors, match } = this.props;
        const { whatYouLearnArr, requirementsArr, descriptionArr, forUserArr, includeArr } = this.state;
        var whatYouLearnList, requirementsList, descriptionList, forUserList, includeList;
        if(!JSONisEmpty(khoaHoc)){
            whatYouLearnList = whatYouLearnArr.map((wyl, i) => (
                <div className="col-md-12 mb-3">
                    <div className="what-you-learn-container-text w-100">
                         <div>
                             <MDBIcon icon="thumbs-up" /> {wyl}
                             <Button
                                 color="red"
                                 className="p-2 px-3 m-0 float-right"
                                 onClick={this.handlerRemove.bind(this, "whatYouLearnArr", i)}
                             >
                                 X
                             </Button>
                         </div>
                    </div>
                </div>
            ))

            requirementsList = requirementsArr.map((r, i) => (
                <li className="mb-3">
                    {r}
                <Button
                    color="red"
                    className="p-2 px-3 m-0 float-right"
                    onClick={this.handlerRemove.bind(this, "requirementsArr", i)}
                >
                    X
                </Button></li>
            ))

            descriptionList = descriptionArr.map((d, i) => (
                <li className="mb-3">
                    {d}
                <Button
                    color="red"
                    className="p-2 px-3 m-0 float-right"
                    onClick={this.handlerRemove.bind(this, "descriptionArr", i)}
                >
                    X
                </Button></li>
            ))

            forUserList = forUserArr.map((fu, i) => (
                <li className="mb-3">
                    {fu}
                <Button
                    color="red"
                    className="p-2 px-3 m-0 float-right"
                    onClick={this.handlerRemove.bind(this, "forUserArr", i)}
                >
                    X
                </Button></li>
            ))

            includeList = includeArr.map((inc, i) => (
                <li className="mb-3">
                    {inc}
                <Button
                    color="red"
                    className="p-2 px-3 m-0 float-right"
                    onClick={this.handlerRemove.bind(this, "includeArr", i)}
                >
                    X
                </Button></li>
            ))
            var backLinkArr = [
                {
                    name: `${nhomKhoaHoc.name}`,
                    link: `/user/manager/nhomkhoahoc/${nhomKhoaHoc._id}`,
                },
                {
                    name: `${khoaHoc.name}`,
                    link: `/user/manager/nhomkhoahoc/${nhomKhoaHoc._id}/khoahoc/${khoaHoc._id}/information`,
                },
            ]
            return(
                <div>
                    <NavbarBackLink
                        backLinkArr={backLinkArr}
                    />
                    <h3>{khoaHoc.name}</h3>
                    <Input
                        label="Hình minh họa khóa học (test)"
                        id="imageUrl"
                        onChange={this.handlerInputChange}
                        required
                        value={this.state.imageUrl}
                    />
                    <Input
                        label="Video giới ngắn thiệu khóa học"
                        id="videoUrl"
                        onChange={this.handlerInputChange}
                        required
                        value={this.state.videoUrl}
                    />
                    <Input
                         id="introduction"
                         type="textarea"
                         label="Giới thiệu qua về khóa học"
                         rows="6"
                         required
                         onChange={this.handlerInputChange}
                         value={this.state.introduction}
                    />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8">

                                <div className="container-fluid what-you-learn-container mb-3">
                                    <h3>What you'll learn</h3>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <Input
                                                 id="whatYouLearn"
                                                 type="textarea"
                                                 label="Giới thiệu qua về khóa học"
                                                 rows="4"
                                                 required
                                                 onChange={this.handlerInputChange}
                                                 value={this.state.whatYouLearn}
                                            />
                                        <Button onClick={this.handlerAdd.bind(this, "whatYouLearn", "whatYouLearnArr")}>+</Button>
                                        </div>
                                        <div className="col-md-12">
                                            { whatYouLearnList }
                                        </div>

                                    </div>
                                </div>

                                <div className="container-fluid what-you-learn-container mb-3">
                                    <h3>Requirements</h3>
                                    <Input
                                         id="requirements"
                                         type="textarea"
                                         label="Khóa học yêu cầu gì"
                                         rows="4"
                                         required
                                         onChange={this.handlerInputChange}
                                         value={this.state.requirements}
                                    />
                                    <Button onClick={this.handlerAdd.bind(this, "requirements", "requirementsArr")}>+</Button>
                                    <ul>
                                        {requirementsList}
                                    </ul>
                                </div>

                                <div className="container-fluid what-you-learn-container mb-3">
                                    <h3>Description</h3>
                                    <Input
                                         id="description"
                                         type="textarea"
                                         label="Chi tiết về khóa học"
                                         rows="6"
                                         required
                                         onChange={this.handlerInputChange}
                                         value={this.state.description}
                                    />
                                    <Button onClick={this.handlerAdd.bind(this, "description", "descriptionArr")}>+</Button>
                                    <ul>
                                        {descriptionList}
                                    </ul>
                                </div>

                                <div className="container-fluid what-you-learn-container mb-3">
                                    <h3>Who this course is for:</h3>
                                    <Input
                                         id="forUser"
                                         type="textarea"
                                         label="Khóa học phù hợp cho ai ?"
                                         rows="4"
                                         required
                                         onChange={this.handlerInputChange}
                                         value={this.state.forUser}
                                    />
                                    <Button onClick={this.handlerAdd.bind(this, "forUser", "forUserArr")}>+</Button>
                                    <ul>
                                        {forUserList}
                                    </ul>
                                </div>

                            </div>
                            <div className="col-md-4 ">
                                <div className="register-course-container card p-4">
                                    <h2>Bao gồm: </h2>
                                    <Input
                                         id="include"
                                         type="textarea"
                                         label="Tóm tắt khóa học bao gồm nội dung gì ?"
                                         rows="4"
                                         required
                                         onChange={this.handlerInputChange}
                                         value={this.state.include}
                                    />
                                    <Button onClick={this.handlerAdd.bind(this, "include", "includeArr")}>+</Button>
                                    <ul>
                                        {includeList}
                                    </ul>
                                </div>
                                <div className="register-course-container card p-4 mt-3">
                                    <h2>Chi tiết: </h2>
                                        <Link
                                            style={{outLine:"none"}}
                                            className="btn btn-danger"
                                            to={`${match.url}/content`}
                                        >
                                            Nội dung học
                                        </Link>
                                        <Link
                                            style={{outLine:"none"}}
                                            className="btn btn-danger"
                                            to={`${match.url}/test`}
                                        >
                                            Bài kiểm tra
                                        </Link>
                                        <Link
                                            style={{outLine:"none"}}
                                            className="btn btn-danger"
                                            to={`${match.url}/class`}
                                        >
                                            Xem Lớp
                                        </Link>
                                </div>
                                <div className="w-100 mt-3 ">
                                    <Button className="p-3 m-0 w-100" color="blue" onClick={this.handlerPostChiTietKhoaHoc}>Cập nhật chi tiết khóa học</Button>
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


                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <div>ERROR</div>
        }

    }
}

export default withRouter(ManagerCoSoDaoTaoKhoaHocInformation);
