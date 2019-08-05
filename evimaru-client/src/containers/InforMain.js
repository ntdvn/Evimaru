import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import InforUser from "../components/InforUser";
import ManagerUser from "./ManagerUser"
import withAuth from "../hocs/withAuth";


const InforMain = props  => {
    
    return (
        <div style={{width: "100%"}}>
            <Route
                exact
                path={props.match.url}
                render={() =>
                    <InforUser {...props}/>
                }
            />
            <Route
                path={`${props.match.url}/manager`}
                component={withAuth(ManagerUser)}
                {...props}

            />
        </div>
    )
}

export default InforMain;
