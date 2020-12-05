import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// import firebase from 'firebase';

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const MenuBar = (props) => {

    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton> */}
                <Typography variant="h6" className={classes.title}>
                    <Button color="inherit" component={RouterLink} to="/">ToDo App</Button>
                    {/* {`${props.isSignedIn}`} */}
                    {/* {firebase.auth().currentUser?.uid} */}
                </Typography>
                {props.isSignedIn ? (
                    <Button color="inherit" onClick={() => {
                        props.signOutHandler()
                        window.location.href = '/login'
                    }}>Logout</Button>
                ) : (
                        <>
                            <Button color="inherit" component={RouterLink} to="/login">Login</Button>
                            <Button color="inherit" component={RouterLink} to="/signup">Sign Up</Button>
                            {/* <Button color="inherit" component={RouterLink} to="/register">Register</Button> */}
                        </>
                    )}
            </Toolbar>
        </AppBar>
    );
}

export default MenuBar;