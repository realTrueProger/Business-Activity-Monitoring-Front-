import React, {useState} from "react";
import {TextField} from "@material-ui/core";
import {Button} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import {apiUrl} from "../../config";

const useStyles = makeStyles(() => ({
    marginButton: {
        marginLeft: '10px',
        marginTop: '22px',
    },
    marginInput: {
        marginTop: '5px'
    }
}));

const BpmConfig = () => {
    const classes = useStyles();
    const [engineUrl, setEngineUrl] = useState('localhost:8081');
    const [syncTime, setSyncTime] = useState('5');
    const updateEngineUrl = () => {
        axios.get(`${apiUrl}/engine?address=${engineUrl}`).then(res => console.log(res))
    };
    const updateSyncTime = () => {
        axios.get(`${apiUrl}/engine?sync=${syncTime}`).then(res => console.log(res))
    };

    return (
        <div>
            <TextField
                className={classes.marginInput}
                id="standard-basic"
                label="Engine"
                value={engineUrl}
                onChange={(e) => setEngineUrl(e.target.value)}/>
            <Button className={classes.marginButton} variant="outlined" size={'small'} color="primary"
                    onClick={updateEngineUrl}>update</Button>
            <br/>
            <TextField
                className={classes.marginInput}
                id="standard-basic"
                label="SyncTime"
                value={syncTime}
                onChange={(e) => setSyncTime(e.target.value)}/>
            <Button className={classes.marginButton} variant="outlined" size={'small'} color="primary"
                    onClick={updateSyncTime}>update</Button>
        </div>
    )
};

export default BpmConfig;