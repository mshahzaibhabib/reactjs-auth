import React, { useContext, useEffect, useState } from 'react';
import axios from './../axios';
import { AuthContext } from './../context/AuthContext';
import { validateLoginInput } from './../validators/validatros';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';



function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Todo App
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const LoginForm = () => {

    const classes = useStyles();

    const context = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputErrors, setInputErrors] = useState({});
    const [invalidCredentialsError, setInvalidCredentialsError] = useState(false);
    const [requestInProgress, setRequestInProgress] = useState(false);
    // indicates rejected login request
    const [requestRejectionStatus, setRequestRejectionStatus] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const sendSignInRequest = async (event) => {
        event.preventDefault();
        setRequestInProgress(true);
        console.log(`${email} - ${password}`);

        const { errors, valid } = validateLoginInput(email, password);
        setTimeout(async () => {
            if (!valid) {
                console.log(`Valid ${valid}`);
                setInputErrors(errors);
                setRequestInProgress(false);
            } else {

                try {

                    const res = await axios({
                        method: 'POST',
                        url: '/auth/login',
                        data: {
                            email,
                            password
                        }
                    });

                    console.log(res);

                    if (res.data.status === 'Success') {
                        setInvalidCredentialsError(false);
                        console.log('Valid Login');
                        context.login(res.data);
                        setRequestInProgress(false);
                        window.location.href = '/protected';
                    } else if (res.data.status === 'Fail') {
                        console.log('Invalid Login');
                        setInvalidCredentialsError(true);
                        setRequestInProgress(false);
                    }
                } catch (error) {
                    console.log(error);
                    setRequestRejectionStatus(true);
                    setRequestInProgress(false);
                }
            }
        }, 1500);
    }

    useEffect(() => {
        console.log(inputErrors);
    }, [inputErrors]);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <div className={classes.root}>
                    <Collapse in={requestRejectionStatus}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setRequestRejectionStatus(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            severity='error'
                        >
                            <strong>Can not sign in</strong> - Please try again!
                        </Alert>
                    </Collapse>
                    <Collapse in={invalidCredentialsError}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setInvalidCredentialsError(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            severity='error'
                        >
                            <strong>Invalid Credentials</strong> - Please try again!
                    </Alert>
                    </Collapse>
                </div>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={(event) => sendSignInRequest(event)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        // required={true}
                        fullWidth
                        id="email"
                        label="Email Address"
                        // type="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(event) => handleEmailChange(event)}
                        error={inputErrors.email ? true : false}
                        helperText={inputErrors.email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        // required={true}
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => handlePasswordChange(event)}
                        error={inputErrors.password ? true : false}
                        helperText={inputErrors.password}
                    />
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                    {requestInProgress ? (
                        <Container style={{ marginTop: 20, marginBottom: 20, display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Container>
                    ) : (
                            <>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                // onClick={(event) => { sendSignInRequest(event) }}
                                >
                                    Sign In
                            </Button>
                                <Grid container>
                                    {/* <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid> */}
                                    <Grid item>
                                        <Link href="/signup" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </>
                        )}

                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default LoginForm;