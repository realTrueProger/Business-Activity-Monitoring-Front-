import { createStore } from 'redux';


//action generator
const incrementBy = ({ incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
});


//reducer
const countReducer = (state = { count: 0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy,
            };
        default:
            return state;
    }
};

// store
const store = createStore(countReducer);


// store dispatch
store.dispatch(incrementBy({incrementBy: 10}));
console.log(store.getState());