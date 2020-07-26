import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import TableView from "../components/TableView";
import Header from "../components/Header";
import Container from "@material-ui/core/Container";
import {SnackbarProvider} from 'notistack';

const AppRouter = () => (
    <BrowserRouter>
        <SnackbarProvider maxSnack={10}>
            <Container maxWidth={false}>
                <Header/>
                <Switch>
                    <Route path="/" exact={true}>
                        <TableView/>
                    </Route>
                    <Route path="/:table" exact={true}>
                        <TableView/>
                    </Route>
                    <Route path="/:table/:id" exact={true}>
                        <TableView/>
                    </Route>
                </Switch>
            </Container>
        </SnackbarProvider>
    </BrowserRouter>
);

export default AppRouter;
