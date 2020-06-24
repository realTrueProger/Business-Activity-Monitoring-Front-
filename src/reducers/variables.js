const VariablesDefaultState = {
    loading: false,
    error: null,
    rows: [],
};

export default (state = VariablesDefaultState, action) => {
    switch (action.type) {
        case 'GET_VARIABLES_STARTED':
            return {
                ...state,
                loading: true
            };
        case 'GET_VARIABLES_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                rows: action.payload,
            };
        case 'GET_VARIABLES_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};