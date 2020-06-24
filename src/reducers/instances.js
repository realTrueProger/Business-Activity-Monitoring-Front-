const instancesDefaultState = {
    loading: false,
    error: null,
    rows: [],
};

export default (state = instancesDefaultState, action) => {
    switch (action.type) {
        case 'GET_INSTANCES_STARTED':
            return {
                ...state,
                loading: true
            };
        case 'GET_INSTANCES_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                rows: action.payload,
            };
        case 'GET_INSTANCES_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};