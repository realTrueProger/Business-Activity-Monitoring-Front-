const initialState = {
    loading: false,
    error: null,
    rows: [],
};

export default (state = initialState, action) => {
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
        case 'UPDATE_SINGLE_INSTANCE':
            return {
                ...state,
                rows: state.rows.map(item => {
                    return item.id === action.updated.id ? action.updated : item;
                })
            };
        default:
            return state;
    }
};