import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import {Provider} from 'react-redux';
import {getDefinitions} from "./actions/getDefinitions";
import {getIncidents} from "./actions/getIncidents";
import {getTasks} from "./actions/getTasks";
import {getInstances} from "./actions/getInstances";
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

store.dispatch(getDefinitions());
store.dispatch(getIncidents());
store.dispatch(getTasks());
store.dispatch(getInstances());


const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
