import React from "react";
import {Paper} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import { useSelector } from 'react-redux'
import { compose, map, path, pick, prop } from 'ramda';

const useStyles = makeStyles(() => ({
    paper: {
        padding: '5px',
        marginTop: '1rem',
        marginBottom: '1rem',
    },
}));

const StatusBar = (props) => {
    const length = useSelector(compose(
        map(path(['rows', 'length'])),
        pick(['definitions', 'instances', 'tasks', 'incidents']),
    ));

    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.paper}>
                <h2>Current status</h2>
                <p>Processes deployed: {length.definitions}</p>
                <p>Running Process Instances: {length.instances}</p>
                <p>Open Incidents: {length.incidents}</p>
                <p>Open Human Tasks: {length.tasks}</p>
            </Paper>
        </div>);
};


export default StatusBar;