import { CREATE_USER_INFORMATION, LOAD_USER_INFORMATION }  from "../actionTypes";
import {apiCall} from "../../services/api";
import {addError, removeError} from "./errors"

export function createUserInformation(userInformation){
    return {
        type: CREATE_USER_INFORMATION,
        userInformation
    }
}

export function loadUserInformation(userInformation){
    return {
        type: LOAD_USER_INFORMATION,
        userInformation
    }
}

export const postUserInformation = userInformationData => (dispatch, getState) => {
    let {currentUser} = getState();
    const userId = currentUser.user.id;
    return apiCall("post", `/api/user-information/${userId}`, userInformationData)
    .then(res => dispatch(createUserInformation({...userInformationData})))
    .catch(err => dispatch(addError(err.message)))
}

export const getUserInformation = () => (dispatch,getState) => {
    let {currentUser} = getState();
    const userId = currentUser.user.id;
    return apiCall("get", `/api/user-information/${userId}`)
    .then(res => {
        dispatch(loadUserInformation(res))
    })
    .catch(err => dispatch(addError(err.message)))
}
