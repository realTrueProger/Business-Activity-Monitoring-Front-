import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getDefinitions,
    getDefinitionsSuccess,
    getDefinitionsStarted,
    getDefinitionsFailure} from "../../actions/getDefinitions";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


test('should execute fetch data', () => {
    const store = mockStore({});

    // Return the promise
    return store.dispatch(getDefinitions())
        .then(() => {

            console.log('success');

        }).catch(() => {
            console.log('error');
            const actions = store.getActions();
            expect(actions[0]).toEqual(getDefinitionsFailure());
        })
});