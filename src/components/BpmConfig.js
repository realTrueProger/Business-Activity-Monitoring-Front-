import React, {useState, useEffect} from "react";
import {TextField} from "@material-ui/core";
import {Button} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import api from "../../api-config";

const useStyles = makeStyles(() => ({
    marginButton: {
        marginLeft: '10px',
        marginTop: '22px',
    },
    marginInput: {
        marginTop: '5px',
        // minWidth: '225px',
    }
}));

const BpmConfig = () => {
    const classes = useStyles();
    const [engineUrl, setEngineUrl] = useState('fetching data...');
    const [syncTime, setSyncTime] = useState('fetching data...');
    const updateEngineUrl = () => {
        axios.get(`${api.apiUrl}/engine?address=${engineUrl}`).then(res => console.log(res))
    };
    const updateSyncTime = () => {
        axios.get(`${api.apiUrl}/engine?sync=${syncTime}`).then(res => console.log(res))
    };

    useEffect(() => {
        axios.get(`${api.apiUrl}/engine/address`).then(res => setEngineUrl(res.data));
        axios.get(`${api.apiUrl}/engine/sync`).then(res => setSyncTime(res.data));
    }, []);

    return (
        <div>
            <TextField
                className={classes.marginInput}
                label="Engine:"
                value={engineUrl}
                onChange={(e) => setEngineUrl(e.target.value)}/>
            <Button className={classes.marginButton} variant="outlined" size={'small'} color="primary"
                    onClick={updateEngineUrl}>update</Button>
            <br/>
            <TextField
                className={classes.marginInput}
                label="SyncTime(sec):"
                value={syncTime}
                onChange={(e) => setSyncTime(e.target.value)}/>
            <Button className={classes.marginButton} variant="outlined" size={'small'} color="primary"
                    onClick={updateSyncTime}>update</Button>
        </div>
    )
};

export default BpmConfig;