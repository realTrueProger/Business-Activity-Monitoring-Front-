const initialState = {
    loading: false,
    error: null,
    rows: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USERS_STARTED':
            return {
                ...state,
                loading: true
            };
        case 'GET_USERS_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                rows: action.payload,
            };
        case 'GET_USERS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};