export const setSchema = (schema = null, durations = {}) => ({
    type: 'SET_SCHEMA',
    schema,
    durations
});