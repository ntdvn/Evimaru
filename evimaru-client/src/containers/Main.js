import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import UserMain from "./UserMain"
import { authUser, checkCode } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import { removeSuccess } from "../store/actions/success";
import withAuth from "../hocs/withAuth";
import CoSoDaoTaoContainer from "../containers/CoSoDaoTaoContainer"
// import MessageForm from "./MessageForm"

const Main = props => {
    const {authUser, success, errors, removeSuccess, removeError, currentUser} = props;
    return (
        <div className="container-fluid" style={{width: "100"}}>
            <Switch>
                <Route
                    exact
                    path="/login"
                    render={props => {
                        return (
                            <AuthForm
                                removeError={removeError}
                                removeSuccess={removeSuccess}
                                success={success}
                                errors={errors}
                                onAuth={authUser}
                                buttonText="Đăng nhập"
                                {...props}
                            />
                        )
                    }}
                />
                <Route
                    path="/signup"
                    render={props => {
                        return (
                            <AuthForm
                                removeError={removeError}
                                removeSuccess={removeSuccess}
                                success={success}
                                errors={errors}
                                onAuth={authUser}
                                onCheckCode={checkCode}
                                signUp
                                buttonText="Đăng ký"
                                {...props}
                            />
                        )
                    }}
                />
                <Route
                    path="/user"
                    component={withAuth(UserMain)}
                    {...props}
                />
                <Route component={Homepage} {...props}/>
            </Switch>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        success: state.success,
        errors: state.errors
    };
}

export default withRouter(
    connect(mapStateToProps, {authUser, checkCode, removeSuccess, removeError})(Main)
);
