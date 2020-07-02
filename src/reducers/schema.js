const initialState = {
    schema: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SCHEMA' :
            return {
                ...state,
                schema: action.schema,
            };
        default :
            return {
                ...state
            }
    }
}

