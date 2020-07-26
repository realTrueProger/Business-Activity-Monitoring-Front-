import axios from 'axios';
import api from "../../api-config";

export const getInstances = () => {
    return dispatch => {
        dispatch(getInstancesStarted());

        return axios
            .get(`${api.apiUrl}/processInstances`)
            .then(res => {
                dispatch(getInstancesSuccess(res.data));
            })
            .catch(err => {
                dispatch(getInstancesFailure(err.message));
            });
    };
};

const getInstancesSuccess = instances => ({
    type: 'GET_INSTANCES_SUCCESS',
    payload: instances,
});

const getInstancesStarted = () => ({
    type: 'GET_INSTANCES_STARTED'
});

const getInstancesFailure = error => ({
    type: 'GET_INSTANCES_FAILURE',
    payload: {
        error
    }
});