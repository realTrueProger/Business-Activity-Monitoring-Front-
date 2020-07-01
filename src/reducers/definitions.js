const initialState = {
    loading: false,
    error: null,
    rows: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DEFINITIONS_STARTED':
            return {
                ...state,
                loading: true
            };
        case 'GET_DEFINITIONS_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                rows: action.payload,
            };
        case 'GET_DEFINITIONS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};