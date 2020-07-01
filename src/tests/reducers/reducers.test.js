import activities from "../../reducers/activities";
import definitions from "../../reducers/definitions";
import incidents from "../../reducers/incidents";
import instances from "../../reducers/instances";
import tasks from "../../reducers/tasks";
import users from "../../reducers/users";
import variables from "../../reducers/variables";

describe('Reducers initialization tests', () => {
    const initialState = {
        loading: false,
        error: null,
        rows: [],
    };

    test('Should set initial state for activities', () => {
        const state = activities(undefined, {type: '@@INIT'});
        expect(state).toEqual(initialState);
    });

    test('Should set initial state for definitions', () => {
        const state = definitions(undefined, {type: '@@INIT'});
        expect(state).toEqual(initialState);
    });

    test('Should set initial state for incidents', () => {
        const state = incidents(undefined, {type: '@@INIT'});
        expect(state).toEqual(initialState);
    });

    test('Should set initial state for instances', () => {
        const state = instances(undefined, {type: '@@INIT'});
        expect(state).toEqual(initialState);
    });

    test('Should set initial state for tasks', () => {
        const state = tasks(undefined, {type: '@@INIT'});
        expect(state).toEqual(initialState);
    });

    test('Should set initial state for users', () => {
        const state = users(undefined, {type: '@@INIT'});
        expect(state).toEqual(initialState);
    });

    test('Should set initial state for variables', () => {
        const state = variables(undefined, {type: '@@INIT'});
        expect(state).toEqual(initialState);
    });
});
