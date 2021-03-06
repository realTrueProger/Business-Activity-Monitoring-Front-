import axios from 'axios';
import api from "../../api-config";

export const getTasks = () => {
    return dispatch => {
        dispatch(getTasksStarted());

        return axios
            .get(`${api.apiUrl}/tasks`)
            .then(res => {
                dispatch(getTasksSuccess(res.data));
            })
            .catch(err => {
                dispatch(getTasksFailure(err.message));
            });
    };
};

const getTasksSuccess = tasks => ({
    type: 'GET_TASKS_SUCCESS',
    payload: tasks,
});

const getTasksStarted = () => ({
    type: 'GET_TASKS_STARTED'
});

const getTasksFailure = error => ({
    type: 'GET_TASKS_FAILURE',
    payload: {
        error
    }
});