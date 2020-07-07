const initialState = {
    schema: null,
    duration: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SCHEMA' :
            return {
                ...state,
                schema: action.schema,
                durations: action.durations
            };
        default :
            return {
                ...state
            }
    }
}

