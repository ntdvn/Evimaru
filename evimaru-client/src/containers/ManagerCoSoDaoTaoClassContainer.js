import React, { Component } from "react";
import { Switch, Route, withRouter  } from "react-router-dom";
import ManagerCoSoDaoTaoKhoaHocClass from "../components/ManagerCoSoDaoTaoKhoaHocClass";
import ManagerCoSoDaoTaoKhoaHocAddClass from "../components/ManagerCoSoDaoTaoKhoaHocAddClass";
import ManagerCoSoDaoTaoClassInformation from "../components/ManagerCoSoDaoTaoClassInformation";
import ManagerCoSoDaoTaoClassHocVien from "../components/ManagerCoSoDaoTaoClassHocVien";

class ManagerCoSoDaoTaoClassContainer extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        const { nhomKhoaHoc, khoaHoc, match } = this.props;
        return(
            <div>
                <Switch>
                    <Route
                        path={`${this.props.match.url}/:classId/dshv`}
                        render={ () => (
                            <ManagerCoSoDaoTaoClassHocVien
                                {...this.props}
                                nhomKhoaHoc={nhomKhoaHoc}
                                khoaHoc={khoaHoc}
                            />
                        )}
                    />
                    <Route
                        // path={`${this.props.match.url}/add`}
                        path={`/user/manager/nhomkhoahoc/:nhomKhoaHocId/khoaHoc/:khoaHocId/information/class/add`}
                        render={ () => (
                            <ManagerCoSoDaoTaoKhoaHocAddClass
                                {...this.props}
                                nhomKhoaHoc={nhomKhoaHoc}
                                khoaHoc={khoaHoc}
                            />
                        )}
                    />
                    <Route
                        path={`${this.props.match.url}/:classId`}
                        render={ () => (
                            <ManagerCoSoDaoTaoClassInformation
                                {...this.props}
                                nhomKhoaHoc={nhomKhoaHoc}
                                khoaHoc={khoaHoc}
                            />
                        )}
                    />



                    <Route
                        path={`${this.props.match.url}/`}
                        render={() =>
                            <ManagerCoSoDaoTaoKhoaHocClass
                                {...this.props}
                                nhomKhoaHoc={nhomKhoaHoc}
                                khoaHoc={khoaHoc}
                            />
                        }
                    />


                </Switch>
            </div>
        )
    }
}

export default withRouter(ManagerCoSoDaoTaoClassContainer);
