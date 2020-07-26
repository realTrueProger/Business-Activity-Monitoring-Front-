import axios from 'axios';
import api from "../../api-config";

export const getIncidents = () => {
    return dispatch => {
        dispatch(getIncidentsStarted());

        return axios
            .get(`${api.apiUrl}/incidents`)
            .then(res => {
                dispatch(getIncidentsSuccess(res.data));
            })
            .catch(err => {
                dispatch(getIncidentsFailure(err.message));
            });
    };
};

const getIncidentsSuccess = incidents => ({
    type: 'GET_INCIDENTS_SUCCESS',
    payload: incidents,
});

const getIncidentsStarted = () => ({
    type: 'GET_INCIDENTS_STARTED'
});

const getIncidentsFailure = error => ({
    type: 'GET_INCIDENTS_FAILURE',
    payload: {
        error
    }
});