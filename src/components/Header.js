import React from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import BpmConfig from "./BpmConfig";

const useStyles = makeStyles(() => ({
    paper: {
        paddingBottom: '10px',
        marginTop: '5px',
    },
    header: {
        margin: '5px',
    },
    lastGrid: {
        marginLeft: 'auto',
        marginRight: '1rem'
    }
}));


const Header = () => {
    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.paper}>
                <Grid container spacing={1} alignItems={'center'}>
                    <Grid item>
                        <h1 className={classes.header}>BAM prototype UI</h1>
                    </Grid>
                    <Grid item>
                        <Link to={'/definitions'}>
                            <Button variant="contained"
                                    color="primary"
                            >Process definitions</Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to={'/instances'}>
                            <Button
                                variant="contained"
                                color="primary"
                            >Instances</Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to={'/incidents'}>
                            <Button
                                variant="contained"
                                color="primary"
                            >Incidents</Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to={'/activities'}>
                            <Button
                                variant="contained"
                                color="primary"
                            >Activities</Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to={'/tasks'}>
                            <Button
                                variant="contained"
                                color="primary"
                            >Tasks</Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to={'/users'}>
                            <Button
                                variant="contained"
                                color="primary"
                            >Users</Button>
                        </Link>
                    </Grid>
                    <Grid item className={classes.lastGrid}>
                        <BpmConfig />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
};

export default Header;
