import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import {Provider} from 'react-redux';
import {getIncidents} from "./actions/getIncidents";
import {getTasks} from "./actions/getTasks";
import {getInstances} from "./actions/getInstances";
import {getDefinitions} from "./actions/getDefinitions";
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from "./utils/materialTheme";

const store = configureStore();

store.dispatch(getDefinitions());
store.dispatch(getIncidents());
store.dispatch(getTasks());
store.dispatch(getInstances());

const jsx = (
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    </MuiThemeProvider>
);

ReactDOM.render(jsx, document.getElementById('app'));
