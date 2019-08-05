import React, { Component} from "react";
import { connect } from "react-redux";
class ManagerCoQuanQuanLyMoLop extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>MN3</div>
        )
    }
}

function mapStateToProps(state) {
    return {
        coQuanQuanLy: state.coQuanQuanLy,
        currentUser: state.currentUser,
        success: state.success,
        errors: state.errors
    }
}

export default connect(mapStateToProps) (ManagerCoQuanQuanLyMoLop);
