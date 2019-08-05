import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import ManagerCoSoDaoTaoKhoaHocInformation from "../components/ManagerCoSoDaoTaoKhoaHocInformation";

import ManagerCoSoDaoTaoKhoaHocContent from "../components/ManagerCoSoDaoTaoKhoaHocContent";
import ManagerCoSoDaoTaoKhoaHocTest from "../components/ManagerCoSoDaoTaoKhoaHocTest";
import ManagerCoSoDaoTaoKhoaHocClass from "../components/ManagerCoSoDaoTaoKhoaHocClass";

// import ManagerCoSoDaoTaoClass from "../components/ManagerCoSoDaoTaoClass";

import ManagerCoSoDaoTaoClassContainer from "./ManagerCoSoDaoTaoClassContainer";
import ManagerCoSoDaoTaoKhoaHocAddContent from "../components/ManagerCoSoDaoTaoKhoaHocAddContent";
import ManagerCoSoDaoTaoKhoaHocAddTest from "../components/ManagerCoSoDaoTaoKhoaHocAddTest";
// import ManagerCoSoDaoTaoKhoaHocAddClass from "../components/ManagerCoSoDaoTaoKhoaHocAddClass";


import { JSONisEmpty, getIdFromArray } from "../services/multifunctional";


class ManagerCoSoDaoTaoKhoaHocInformationContainer extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        const { coSoDaoTao, success, errors, match } = this.props;
        var nhomKhoaHoc, khoaHoc;
        if(!JSONisEmpty(coSoDaoTao)){

            if(coSoDaoTao.hasOwnProperty('nhomKhoaHoc')){
                nhomKhoaHoc = getIdFromArray(match.params.nhomKhoaHocId, coSoDaoTao.nhomKhoaHoc);
                khoaHoc = getIdFromArray(match.params.khoaHocId, nhomKhoaHoc.khoaHoc);
                // console.log(khoaHoc);
                return (
                    <div>
                        <Switch>

                            <Route
                                path={`${this.props.match.url}/content/add`}
                                render={ () => (
                                    <ManagerCoSoDaoTaoKhoaHocAddContent
                                        {...this.props}
                                        nhomKhoaHoc={nhomKhoaHoc}
                                        khoaHoc={khoaHoc}
                                    />
                                )}
                            />

                            <Route
                                path={`${this.props.match.url}/content`}
                                render={ () => (
                                    <ManagerCoSoDaoTaoKhoaHocContent
                                        {...this.props}
                                        nhomKhoaHoc={nhomKhoaHoc}
                                        khoaHoc={khoaHoc}
                                    />
                                )}
                            />

                            <Route
                                path={`${this.props.match.url}/test/add`}
                                render={ () => (
                                    <ManagerCoSoDaoTaoKhoaHocAddTest
                                        {...this.props}
                                        nhomKhoaHoc={nhomKhoaHoc}
                                        khoaHoc={khoaHoc}
                                    />
                                )}
                            />


                            <Route
                                path={`${this.props.match.url}/test`}
                                render={ () => (
                                    <ManagerCoSoDaoTaoKhoaHocTest
                                        {...this.props}
                                        nhomKhoaHoc={nhomKhoaHoc}
                                        khoaHoc={khoaHoc}
                                    />
                                )}
                            />

                            <Route
                                path={`${this.props.match.url}/class`}
                                render={ () => (
                                    <ManagerCoSoDaoTaoClassContainer
                                        {...this.props}
                                        nhomKhoaHoc={nhomKhoaHoc}
                                        khoaHoc={khoaHoc}
                                    />
                                )}
                            />

                            <Route
                                render={() =>
                                    <ManagerCoSoDaoTaoKhoaHocInformation
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
        } else {
            return <div>ERROR</div>
        }

    }
}

export default withRouter(ManagerCoSoDaoTaoKhoaHocInformationContainer);
