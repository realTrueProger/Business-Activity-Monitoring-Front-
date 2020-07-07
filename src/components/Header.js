import React from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import BpmConfig from "./BpmConfig";

const useStyles = makeStyles(() => ({
    paper: {
        paddingLeft: '5px',
        marginTop: '1em',
    },
    header: {
        margin: '5px',
        marginRight: '20px',
    }
}));


const Header = () => {
    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.paper}>
                <Grid container spacing={2} alignItems={'center'}>
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
                    <Grid item>
                        <BpmConfig />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
};

export default Header;
