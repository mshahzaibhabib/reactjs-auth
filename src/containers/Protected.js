import React, { useContext, useEffect } from 'react';
import { AuthContext, AuthProvider } from './../context/AuthContext';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: 40
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginTop: 100
    },
    addNew: {
        float: "right"
    },
    gridList: {
        width: 500,
        height: 450,
    }
}));

const ProtectedRoute = () => {

    const classes = useStyles();

    const { user } = useContext(AuthContext);

    useEffect(() => {
        console.log(user);
    })

    return (
        <Container maxWidth="md">
            <Grid container>
                <Grid item xs={12}>
                    {user ? (
                        <Paper className={classes.paper} elevation={3}>
                            <h2>{user.username}</h2>
                            <h2>{user.sub}</h2>
                        </Paper>
                    ) : (
                            <Paper className={classes.paper} elevation={3}>
                                This is protecetd route, need to login!
                            </Paper>
                        )}
                </ Grid>
            </ Grid>
        </ Container>
    );
};

export default ProtectedRoute;