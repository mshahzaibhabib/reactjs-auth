// Core APIs
import react, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { AuthContext, AuthProvider } from './../context/AuthContext';

// Components
import MenuBar from './../components/MenuBar';
import LoginForm from './../components/LoginForm';
import SignUpForm from './../components/SignUpForm';
import ProtectedRoute from './Protected';


const Main = () => {

    const context = useContext(AuthContext);
    const [isSignedIn, setIsSignedIn] = useState(() => {
        return context.user ? true : false;
    });

    useEffect(() => {
        console.log(context);
        console.log(`Login : ${isSignedIn}`);
    });

    return (
        <Router>
            <AuthProvider>
                <MenuBar isSignedIn={isSignedIn} signOutHandler={context.logout} />
                {context.user ? (
                    <>
                        <Route exact path='/protected' component={ProtectedRoute} />
                    </>
                ) : (
                        <>
                            <Route exact path='/login' component={LoginForm} />
                            <Route exact path='/signup' component={SignUpForm} />
                            <Route exact path='/protected' component={ProtectedRoute} />
                        </>
                    )}
            </AuthProvider>
        </Router>
    );
};

export default Main;