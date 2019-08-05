import React, {Component} from "react";
import {connect} from "react-redux";

export default function withAuth(ComponentToBeRendered) {
    class Authenticate extends Component{

        componentWillMount() {
            if(this.props.currentUser.isAuthenticated === false){
                this.props.history.push("/login");
            }
        }
        componentWillUpdate(nextProps){
            if(this.props.currentUser.isAuthenticated===false){
                this.props.history.push("/login");
            }
        }

        render(){
            return <ComponentToBeRendered {...this.props} />;
        }
    }
    function mapStateToProps(state) {
        return {
            currentUser: state.currentUser,
        }
    }
    return connect(mapStateToProps)(Authenticate);
}
