import axios from 'axios';
import { apiUrl } from "../../config";

export const getVariables = () => {
    return dispatch => {
        dispatch(getVariablesStarted());

        axios
            .get(`${apiUrl}/variables`)
            .then(res => {
                dispatch(getVariablesSuccess(res.data));
            })
            .catch(err => {
                dispatch(getVariablesFailure(err.message));
            });
    };
};

const getVariablesSuccess = Variables => ({
    type: 'GET_VARIABLES_SUCCESS',
    payload: Variables,
});

const getVariablesStarted = () => ({
    type: 'GET_VARIABLES_STARTED'
});

const getVariablesFailure = error => ({
    type: 'GET_VARIABLES_FAILURE',
    payload: {
        error
    }
});