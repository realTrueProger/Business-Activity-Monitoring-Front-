const activitiesDefaultState = {
    loading: false,
    error: null,
    rows: [],
};

export default (state = activitiesDefaultState, action) => {
    switch (action.type) {
        case 'GET_ACTIVITIES_STARTED':
            return {
                ...state,
                loading: true
            };
        case 'GET_ACTIVITIES_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                rows: action.payload,
            };
        case 'GET_ACTIVITIES_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};