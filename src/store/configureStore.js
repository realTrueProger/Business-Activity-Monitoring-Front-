import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import definitions from "../reducers/definitions";
import instances from "../reducers/instances";
import incidents from "../reducers/incidents";
import tasks from "../reducers/tasks";
import users from "../reducers/users";
import activities from "../reducers/activities";
import variables from "../reducers/variables";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
      combineReducers({
          definitions,
          instances,
          incidents,
          tasks,
          users,
          activities,
          variables
      }),
      composeEnhancers(applyMiddleware(thunk)),
  );

  return store;
};
