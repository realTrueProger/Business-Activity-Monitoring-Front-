import React, {useEffect, useState} from "react";
import {Paper} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {useSelector} from 'react-redux'
import RoundChart from "./RoundChart";


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
        justifyContent: 'center'
    },
    box: {
        flexBasis: '30%',
    },
}));

const StatusBar = () => {
    const definitions = useSelector(state => state.definitions.rows);
    const instances = useSelector(state => state.instances.rows);
    const incidents = useSelector(state => state.incidents.rows);

    const classes = useStyles();

    const getChartLabels = (data) => {
        const result1 = {};

        data.forEach(el => {
            if(el.name in result1) {
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

        console.log(result2);
    };

    useEffect(() => {
        if (definitions.length > 0) {
            getChartLabels(definitions);
        }

    }, [definitions]);



    return (
        <div>
            <Paper className={classes.paper}>
                <h2>Current status</h2>
                <div className={classes.flexCont}>
                    <div className={classes.box}>
                        <RoundChart
                            title={'Process definitions'}
                            total={definitions.length}
                        />
                    </div>
                    <div className={classes.box}>
                        <RoundChart
                            title={'Process Instances'}
                            total={instances.length}
                        />
                    </div>
                    <div className={classes.box}>
                        <RoundChart
                            title={'Process Incidents'}
                            total={incidents.length}
                        />
                    </div>
                </div>
            </Paper>
        </div>);
};


export default StatusBar;