import React, {useEffect, useState} from "react";
import {Paper} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {useSelector} from 'react-redux'
import RoundChart from "./RoundChart";
import LineChart from "./LineChart";
import moment from "moment";


const useStyles = makeStyles(() => ({
    paper: {
        padding: '5px',
        paddingBottom: '10px',
        marginTop: '1rem',
        marginBottom: '1rem',
        fontSize: '14px',
    },
    flexCont: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    box1: {
        flexBasis: '20%',
    },
    box2: {
        flexBasis: '25%',
    },
}));

const StatusBar = () => {
    const definitions = useSelector(state => state.definitions.rows);
    const instances = useSelector(state => state.instances.rows);
    const incidents = useSelector(state => state.incidents.rows);
    const tasks = useSelector(state => state.tasks.rows);

    const [instanceLabels, setInstanceLabels] = useState([]);
    const [instanceCounts, setInstanceCounts] = useState([]);

    const [definitionsLabels, setDefinitionsLabels] = useState([]);
    const [definitionsCounts, setDefinitionsCounts] = useState([]);

    const [last30Days, setLast30days] = useState([]);

    const [incidentsCounts, setIncidentsCount] = useState([]);
    const [tasksCounts, setTasksCount] = useState([]);

    const classes = useStyles();

    const getDefinitionsChartLabels = (data) => {
        const result1 = {};

        data.forEach(el => {
            if (el.name in result1) {
                result1[el.name] = result1[el.name] + 1;
            } else {
                result1[el.name] = 1;
            }
        });

        const result2 = {
            labels: [],
            counts: [],
        };

        for (let [key, value] of Object.entries(result1)) {
            result2.labels.push(key);
            result2.counts.push(value);
        }

        setDefinitionsLabels(result2.labels);
        setDefinitionsCounts(result2.counts);
    };

    const getInstancesChartLabels = (data) => {
        const result = {
            active: 0,
            completed: 0
        };

        data.forEach(el => {
            if (el.stateId === 'ACTIVE') {
                result.active = result.active + 1;
            } else {
                result.completed = result.completed + 1;
            }
        });

        setInstanceLabels(['active', 'completed']);
        setInstanceCounts([result.active, result.completed]);
    };

    const getLast30Days = () => {
        const thirtyDaysAgo = moment().subtract(30, 'days');
        const now = moment();
        const resultDatesArr = [];

        while (thirtyDaysAgo.format() !== now.format()) {
            thirtyDaysAgo.add(1, 'days');
            resultDatesArr.push(thirtyDaysAgo.date());
        }

        setLast30days(resultDatesArr);
    };

    const getIncidentORTasksCounts = (dataList, type) => {
        const thirtyDaysAgo = moment().subtract(30, 'days');
        const countsDict = {};
        const resultCountsArr = [];

        last30Days.forEach(date => {
            countsDict[date] = 0;
        });

        dataList.forEach(incident => {
            let createdTime;
            if(type === 'incidents') {
                createdTime = moment(incident.createTime);
            }

            if(type === 'tasks') {
                createdTime = moment(incident.startTime);
            }

            if (createdTime.isAfter(thirtyDaysAgo)) {
                countsDict[createdTime.date()] = countsDict[createdTime.date()] + 1;
            }
        });

        for (let date of Object.values(countsDict)) {
            resultCountsArr.push(date);
        }

        if (type === 'incidents') {
            setIncidentsCount(resultCountsArr);
        }
        if (type === 'tasks') {
            setTasksCount(resultCountsArr);
        }
    };

    useEffect(() => {
        getLast30Days();
    }, []);

    useEffect(() => {
        if (definitions.length > 0) {
            getDefinitionsChartLabels(definitions);
        }

        if (incidents.length > 0) {
            getIncidentORTasksCounts(incidents, 'incidents');
        }

        if (tasks.length > 0) {
            getIncidentORTasksCounts(tasks, 'tasks');
        }

        if (instances.length > 0) {
            getInstancesChartLabels(instances);
        }

    }, [definitions]);

    useEffect(() => {
        if (instances.length > 0) {
            getInstancesChartLabels(instances);
        }

    }, [instances]);

    return (
        <div>
            <Paper className={classes.paper}>
                <h2>Current status</h2>

                <div className={classes.flexCont}>
                    <div className={classes.box1}>
                        <RoundChart
                            title={'Process definitions'}
                            total={definitions.length}
                            labels={definitionsLabels}
                            counts={definitionsCounts}
                        />
                    </div>
                    <div className={classes.box1}>
                        <RoundChart
                            title={'Process Instances'}
                            total={instances.length}
                            labels={instanceLabels}
                            counts={instanceCounts}
                        />
                    </div>
                    <div className={classes.box2}>
                        <LineChart
                            title={'Incidents'}
                            total={incidents.length}
                            labels={last30Days}
                            counts={incidentsCounts}
                        />
                    </div>
                    <div className={classes.box2}>
                        <LineChart
                            title={'User tasks'}
                            total={tasks.length}
                            labels={last30Days}
                            counts={tasksCounts}
                        />
                    </div>
                </div>
            </Paper>
        </div>);
};


export default StatusBar;