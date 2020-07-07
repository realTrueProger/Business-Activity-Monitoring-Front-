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
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const store = configureStore();

store.dispatch(getDefinitions());
store.dispatch(getIncidents());
store.dispatch(getTasks());
store.dispatch(getInstances());

const THEME = createMuiTheme({
    typography: {
        "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
        "fontSize": 10,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500,
        button: {
            "textTransform": 'none'
        }
    }
});

const jsx = (
    <MuiThemeProvider theme={THEME}>
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    </MuiThemeProvider>
);

ReactDOM.render(jsx, document.getElementById('app'));
