/*eslint-disable react/display-name*/
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useHistory, Link} from 'react-router-dom';
import {getIncidents} from "../actions/getIncidents";
import {getTasks} from "../actions/getTasks";
import {getDefinitions} from "../actions/getDefinitions";
import {getInstances} from "../actions/getInstances";
import {getUsers} from "../actions/getUsers";
import {getActivities} from "../actions/getActivities";
import {getVariables} from "../actions/getVariables";
import {setSchema} from "../actions/setSchema";
import MaterialTable from "material-table";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from "@material-ui/core/Button";
import ErrorBoundary from "./ErrorBoundary";
import axios from 'axios';
import {apiUrl} from "../../config";

const TableView = () => {
    let {id = "", table = 'definitions', insId = ""} = useParams();
    let variables = useSelector(state => state.variables.rows) || [];
    const dispatch = useDispatch();

    const rows = useSelector(state => state[table].rows);
    const loading = useSelector(state => state[table].loading);

    if (useHistory().location.state) {
        const fromIncident = useHistory().location.state.fromIncident;
        console.log(fromIncident);
        insId = id;
        id = "";
    }

    useEffect(() => {
        switch (table) {
            case 'incidents':
                dispatch(getIncidents());
                break;
            case 'tasks':
                dispatch(getTasks());
                break;
            case 'definitions':
                dispatch(getDefinitions());
                break;
            case 'instances':
                dispatch(getInstances());
                break;
            case 'users':
                dispatch(getUsers());
                break;
            case 'activities':
                dispatch(getActivities());
                dispatch(getVariables());
                break;
        }
    }, [table]);

    useEffect(() => {
        dispatch(setSchema(null, {}));
    }, [table]);

    const showSchema = (id) => {
        axios.get(`${apiUrl}/processDefinitions/xml/${id}`)
            .then(res => dispatch(setSchema(res.data.xml)));
    };

    const showHeatmap = (definitionId, activities) => {
        let activitiesDurations = {};
        let maxDuration = 0;

        activities.forEach(activity => {
            activitiesDurations[activity.activityId] = activity.durationInMillis;
            if (activity.durationInMillis > maxDuration) {
                activitiesDurations._MAX = activity.durationInMillis;
                maxDuration = activity.durationInMillis;
            }
        });

        axios.get(`${apiUrl}/processDefinitions/xml/${definitionId}`)
            .then(res => dispatch(setSchema(res.data.xml, activitiesDurations)));

        //dispatch(setSchema(schema, activitiesDurations));
    };

    const tableData = {
        definitions: {
            name: 'Process definitions',
            headers: [
                {title: 'name', field: 'name'},
                {title: 'id', field: 'id', defaultFilter: id},
                {
                    title: 'instances',
                    field: 'numberOfProcessInstances',
                    render: rowData => <Link to={`/instances/${rowData.id}`}>{rowData.numberOfProcessInstances}</Link>
                },
                {
                    title: 'incidents',
                    field: 'numberOfIncidents',
                    render: rowData => <Link to={`/incidents/${rowData.id}`}>{rowData.numberOfIncidents}</Link>
                },
                {title: 'deploymentId', field: 'deploymentId'},
                {title: 'version', field: 'version'},
                {
                    title: 'schemaXml',
                    field: 'schemaXml',
                    render: rowData =>
                        <Button
                            onClick={() => showSchema(rowData.id)}
                            variant="contained"
                            color="primary">Show schema</Button>
                }],
        },
        incidents: {
            name: 'Incidents',
            headers: [
                {title: 'id', field: 'id'},
                {title: 'activityId', field: 'activityId'},
                {title: 'definitionId', field: 'definitionId', defaultFilter: id},
                {title: 'createTime', field: 'createTime'},
                {
                    title: 'processInstanceId',
                    field: 'processInstanceId',
                    render: rowData =>
                        <Link
                            to={{pathname: `/instances/${rowData.id}`, state: {fromIncident: true}}}>
                            {rowData.processInstanceId}
                        </Link>
                },
                {title: 'type', field: 'type'},
                {title: 'message', field: 'message'},
                {title: 'open', field: 'open'},
                {title: 'deleted', field: 'deleted'},
                {title: 'resolved', field: 'resolved'}],
        },
        tasks: {
            name: 'Open tasks',
            headers: [
                {title: 'id', field: 'id'},
                {title: 'parentTaskId', field: 'parentTaskId'},
                {title: 'name', field: 'name'},
                {title: 'taskDefinitionKey', field: 'taskDefinitionKey'},
                {title: 'description', field: 'description'},
                {title: 'startTime', field: 'startTime'},
                {title: 'endTime', field: 'endTime'},
                {title: 'owner', field: 'owner'},
                {
                    title: 'assignee',
                    field: 'assignee',
                    render: rowData =>
                        <Link to={`/users/${rowData.assignee}`}>
                            {rowData.assignee}
                        </Link>
                },
                {title: 'removalTime', field: 'removalTime'},
                {title: 'dueTime', field: 'dueTime'},
                {title: 'removalTime', field: 'removalTime'},
                {title: 'followupTime', field: 'followupTime'},
                {title: 'activityInstanceId', field: 'activityInstanceId'},
                {title: 'priority', field: 'priority'}],
        },
        instances: {
            name: 'Instances',
            headers: [
                {title: 'id', field: 'id', defaultFilter: insId},
                {
                    title: 'definitionId',
                    field: 'definitionId',
                    defaultFilter: id,
                    render: rowData =>
                        <Link to={`/definitions/${rowData.definitionId}`}>
                            {rowData.definitionId}
                        </Link>
                },
                {
                    title: 'getActivities',
                    field: 'getActivities',
                    render: rowData =>
                        <Button variant="contained" color="primary">
                            <Link
                                className={'button-link'}
                                to={`/activities/${rowData.id}`}
                            >getActivities</Link>
                        </Button>
                },
                {
                    title: 'heatMap',
                    field: 'getActivities',
                    render: rowData => <Button
                        onClick={() => showHeatmap(rowData.definitionId, rowData.activityInstancesById)}
                        variant="contained"
                        color="primary">heatMap</Button>
                },
                {title: 'durationInMillis', field: 'durationInMillis'},
                {
                    title: 'startUserId',
                    field: 'startUserId',
                    render: rowData => <Link to={`/users/${rowData.startUserId}`}>{rowData.startUserId}</Link>

                },
                {title: 'startTime', field: 'startTime'},
                {title: 'endTime', field: 'endTime'},
                {title: 'removalTime', field: 'removalTime'},
                {title: 'startActivityId', field: 'startActivityId'},
                {title: 'stateId', field: 'stateId'},
                {title: 'rootProcessInstanseId', field: 'rootProcessInstanseId'},
                {title: 'lastSyncTime', field: 'lastSyncTime'},
            ],
        },
        users: {
            name: 'Users',
            headers: [
                {title: 'id', field: 'id', defaultFilter: id},
                {title: 'email', field: 'email'},
                {title: 'firstname', field: 'firstname'},
                {title: 'lastname', field: 'lastname'}
            ]
        },
        activities: {
            name: 'Activities',
            headers: [
                {title: 'type', field: 'type'},
                {title: 'name', field: 'name'},
                {title: 'durationInMillis', field: 'durationInMillis'},
                {title: 'startTime', field: 'startTime'},
                {title: 'endTime', field: 'endTime'},
                {
                    title: 'processInstanceId',
                    field: 'processInstanceId',
                    defaultFilter: id,
                    render: rowData =>
                        <Link
                            to={{pathname: `/instances/${rowData.processInstanceId}`, state: {fromIncident: true}}}
                        >{rowData.processInstanceId}</Link>
                },
                {title: 'id', field: 'id'},
                {title: 'parentActivityInstanceId', field: 'parentActivityInstanceId'},
                {title: 'activityId', field: 'activityId'},
                {title: 'removalTime', field: 'removalTime'},
                {title: 'canceled', field: 'canceled'},
                {title: 'executionId', field: 'executionId'},
            ]
        }
    };

    const renderVariablesData = (rowData) => {
        let vars = variables
            .filter(variable => variable.processInstanceId === rowData.processInstanceId);

        if (vars.length === 0) {
            return (
                <p className={'m-left-1'}>No variables</p>
            )
        }

        let resultVars = [];
        let activityStart = Date.parse(rowData.startTime);
        let activityEnd = Date.parse(rowData.endTime);

        vars.forEach(vrb => {
            if (vrb.variableHistoriesById.length === 0) return;

            vrb.variableHistoriesById
                .filter(history =>
                    history.scope === rowData.id)
                .forEach(el => {
                    resultVars.push({
                        name: vrb.name,
                        tz: el.timeZone,
                        value: el.value,
                        type: el.type,
                        time: el.time,
                        id: el.id,
                        scope: 'activity'
                    })
                });

            vrb.variableHistoriesById
                .filter(history =>
                    history.scope !== rowData.id && Date.parse(history.time) >= activityStart && Date.parse(history.time) <= activityEnd)
                .forEach(el => {
                    resultVars.push({
                        name: vrb.name,
                        tz: el.timeZone,
                        value: el.value,
                        type: el.type,
                        time: el.time,
                        id: el.id,
                        scope: 'process'
                    })
                });
        });

        if (resultVars.length === 0) {
            return (
                <p className={'m-left-1'}>No variables</p>
            )
        }

        return (
            <TableContainer>
                <h5>Variables: </h5>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Scope</TableCell>
                            <TableCell>Update time</TableCell>
                            <TableCell>Time zone</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {resultVars.map((v) => (
                            <TableRow hover key={v.id}>
                                <TableCell>{v.name}</TableCell>
                                <TableCell>{v.value || 'null'}</TableCell>
                                <TableCell>{v.type}</TableCell>
                                <TableCell>{v.scope}</TableCell>
                                <TableCell>{v.time}</TableCell>
                                <TableCell>{v.tz}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    };

    const showPanel = () => {
        if (table !== 'activities') {
            return undefined;
        }

        return renderVariablesData;
    };

    return (
        <>
            <ErrorBoundary>
                <MaterialTable
                    key={tableData[table].name}
                    title={tableData[table].name}
                    columns={tableData[table].headers}
                    data={rows}
                    options={{
                        filtering: true,
                        pageSize: 10,
                        draggable: false
                    }}
                    isLoading={loading}
                    detailPanel={showPanel()}
                />
            </ErrorBoundary>
        </>
    )
};

export default TableView;


