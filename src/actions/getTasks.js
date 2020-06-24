import axios from 'axios';
import { apiUrl } from "../../config";

export const getTasks = () => {
    return dispatch => {
        dispatch(getTasksStarted());

        axios
            .get(`${apiUrl}/tasks`)
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