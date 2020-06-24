import axios from 'axios';
import { apiUrl } from "../../config";

export const getActivities = () => {
    return dispatch => {
        dispatch(getActivitiesStarted());

        axios
            .get(`${apiUrl}/activityInstances`)
            .then(res => {
                dispatch(getActivitiesSuccess(res.data));
            })
            .catch(err => {
                dispatch(getActivitiesFailure(err.message));
            });
    };
};

const getActivitiesSuccess = activities => ({
    type: 'GET_ACTIVITIES_SUCCESS',
    payload: activities,
});

const getActivitiesStarted = () => ({
    type: 'GET_ACTIVITIES_STARTED'
});

const getActivitiesFailure = error => ({
    type: 'GET_ACTIVITIES_FAILURE',
    payload: {
        error
    }
});