import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {getDefinitions} from "../../actions/getDefinitions";
import {getActivities} from "../../actions/getActivities";
import {getIncidents} from "../../actions/getIncidents";
import {getInstances} from "../../actions/getInstances";
import {getTasks} from "../../actions/getTasks";
import {getUsers} from "../../actions/getUsers";
import {getVariables} from "../../actions/getVariables";
jest.setTimeout(15000);
import api from '../../../api-config';

if(process.env.API_URL) {
    api.setApi(process.env.API_URL);
}

const mockStore = configureStore([thunk]);

describe('Data fetching tests:', () => {
    let store = mockStore({});

    beforeEach(() => {
        store = mockStore({});
    });

    const makeRequest = (store, action, expected, done) => {
        return store.dispatch(action)
            .then(() => {
                const actions = store.getActions().map(action => action.type);
                expect(actions).toEqual(expected);
                done();
            })
    };

    test('should fetch definitions data', (done) => {
        const expectedActions = [
            'GET_DEFINITIONS_STARTED',
            'GET_DEFINITIONS_SUCCESS'
        ];

        return makeRequest(store, getDefinitions(), expectedActions, done);
    });

    test('should fetch activities data', (done) => {
        const expectedActions = [
            'GET_ACTIVITIES_STARTED',
            'GET_ACTIVITIES_SUCCESS'
        ];

        return makeRequest(store, getActivities(), expectedActions, done);
    });

    test('should fetch incidents data', (done) => {
        const expectedActions = [
            'GET_INCIDENTS_STARTED',
            'GET_INCIDENTS_SUCCESS'
        ];

        return makeRequest(store, getIncidents(), expectedActions, done);
    });

    test('should fetch instances data', (done) => {
        const expectedActions = [
            'GET_INSTANCES_STARTED',
            'GET_INSTANCES_SUCCESS'
        ];

        return makeRequest(store, getInstances(), expectedActions, done);
    });

    test('should fetch tasks data', (done) => {
        const expectedActions = [
            'GET_TASKS_STARTED',
            'GET_TASKS_SUCCESS'
        ];

        return makeRequest(store, getTasks(), expectedActions, done);
    });

    test('should fetch users data', (done) => {
        const expectedActions = [
            'GET_USERS_STARTED',
            'GET_USERS_SUCCESS'
        ];

        return makeRequest(store, getUsers(), expectedActions, done);
    });

    test('should fetch variables data', (done) => {
        const expectedActions = [
            'GET_VARIABLES_STARTED',
            'GET_VARIABLES_SUCCESS'
        ];

        return makeRequest(store, getVariables(), expectedActions, done);
    });
});


