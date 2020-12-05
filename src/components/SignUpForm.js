import React, { useEffect, useContext, useState } from 'react';
import axios from './../axios';
import { AuthContext } from './../context/AuthContext';
import { validateRegisterInput } from './../validators/validatros';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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


const SignUpForm = () => {
    const classes = useStyles();

    const context = useContext(AuthContext);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConform] = useState('');
    const [inputErrors, setInputErrors] = useState({});
    const [requestInProgress, setRequestInProgress] = useState(false);
    // indicates signup request rejection even for valid inputs
    const [requestRejectionStatus, setRequestRejectionStatus] = useState(false);

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handlePasswordConfirmChange = (event) => {
        setPasswordConform(event.target.value);
    }

    const sendSignUpRequest = async (event) => {
        event.preventDefault();
        setRequestInProgress(true);
        console.log(`${userName} - ${email} - ${password} - ${passwordConfirm}`);

        const { errors, valid } = validateRegisterInput(userName, email, password, passwordConfirm);
        setTimeout(async () => {
            if (!valid) {
                console.log(`Valid ${valid}`);
                setInputErrors(errors);
                setRequestInProgress(false);
            } else {
                try {
                    const res = await axios({
                        method: 'POST',
                        url: '/auth/signup',
                        data: {
                            userName,
                            email,
                            password,
                            passwordConfirm
                        }
                    });

                    console.log(res);

                    if (res.data.status === 'Success') {
                        setRequestRejectionStatus(false);
                        console.log('Valid SignUp');
                        context.login(res.data);
                        setRequestInProgress(false);
                        window.location.href = '/protected';
                    } else if (res.data.status === 'Fail') {
                        console.log('Invalid SignUp');
                        setRequestRejectionStatus(true);
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
                            <strong>Can not signup</strong> - Please try again!
                        </Alert>
                    </Collapse>
                </div>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} onSubmit={(event) => sendSignUpRequest(event)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        // required
                        fullWidth
                        id="userName"
                        label="Username"
                        type="text"
                        name="userName"
                        autoComplete="userName"
                        autoFocus
                        value={userName}
                        onChange={(event) => handleUserNameChange(event)}
                        error={inputErrors.userName ? true : false}
                        helperText={inputErrors.userName}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        // required
                        fullWidth
                        id="email"
                        label="Email Address"
                        // type="text"
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
                        // required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => handlePasswordChange(event)}
                        error={inputErrors.password ? true : false}
                        helperText={inputErrors.password}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="passwordConfirm"
                        label="Confirm Password"
                        type="password"
                        id="passwordConfirm"
                        autoComplete="current-password"
                        value={passwordConfirm}
                        onChange={(event) => handlePasswordConfirmChange(event)}
                        error={inputErrors.passwordConfirm ? true : false}
                        helperText={inputErrors.passwordConfirm}
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
                                // onClick={(event) => { sendSignUpRequest(event) }}
                                >
                                    Sign Up
                                </Button>
                                <Grid container>
                                    {/* <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid> */}
                                    <Grid item>
                                        <Link href="/login" variant="body2">
                                            {"Already have an account? Sign In"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </>
                        )}
                    {/* <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    // onClick={(event) => { sendSignUpRequest(event) }}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/login" variant="body2">
                                {"Already have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid> */}
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container >
    );
}

export default SignUpForm;