import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import TableView from "../components/TableView";
import Header from "../components/Header";
import StatusBar from "../components/StatusBar";
import Container from "@material-ui/core/Container";

const AppRouter = () => (
    <BrowserRouter>
        <Container maxWidth={false}>
            <Header/>
            <StatusBar/>
            <Switch>
                <Route path="/" exact={true} >
                    <TableView />
                </Route>
                <Route path="/:table" exact={true}>
                    <TableView />
                </Route>
                <Route path="/:table/:id" exact={true}>
                    <TableView />
                </Route>
            </Switch>
        </Container>
    </BrowserRouter>
);

export default AppRouter;
