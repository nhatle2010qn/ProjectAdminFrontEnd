import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) =>
{
    const role = JSON.parse(localStorage.getItem('currentUser')).role;
 return(
    <Route
        {...rest}
        render={props =>
            localStorage.getItem('currentUser') && role == 'Admin'  ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )}
    />
);
}
