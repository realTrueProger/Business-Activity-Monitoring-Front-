import axios from 'axios';
import { apiUrl } from "../../config";

export const getUsers = () => {
    return dispatch => {
        dispatch(getUsersStarted());

        axios
            .get(`${apiUrl}/users`)
            .then(res => {
                dispatch(getUsersSuccess(res.data));
            })
            .catch(err => {
                dispatch(getUsersFailure(err.message));
            });
    };
};

const getUsersSuccess = users => ({
    type: 'GET_USERS_SUCCESS',
    payload: users,
});

const getUsersStarted = () => ({
    type: 'GET_USERS_STARTED'
});

const getUsersFailure = error => ({
    type: 'GET_USERS_FAILURE',
    payload: {
        error
    }
});