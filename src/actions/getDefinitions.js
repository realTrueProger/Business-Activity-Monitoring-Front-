import axios from 'axios';
import api from "../../api-config";

export const getDefinitions = () => {
    return dispatch => {
        dispatch(getDefinitionsStarted());

        return axios
            .get(`${api.apiUrl}/processDefinitions`)
            .then(res => {
                dispatch(getDefinitionsSuccess(res.data));
            })
            .catch(err => {
                dispatch(getDefinitionsFailure(err.message));
            });
    };
};

export const getDefinitionsSuccess = defenitions => ({
    type: 'GET_DEFINITIONS_SUCCESS',
    payload: defenitions,
});

export const getDefinitionsStarted = () => ({
    type: 'GET_DEFINITIONS_STARTED'
});

export const getDefinitionsFailure = error => ({
    type: 'GET_DEFINITIONS_FAILURE',
    payload: {
        error
    }
});