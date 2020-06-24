const incidentsDefaultState = {
    loading: false,
    error: null,
    rows: [],
};

export default (state = incidentsDefaultState, action) => {
    switch (action.type) {
        case 'GET_INCIDENTS_STARTED':
            return {
                ...state,
                loading: true
            };
        case 'GET_INCIDENTS_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                rows: action.payload,
            };
        case 'GET_INCIDENTS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};