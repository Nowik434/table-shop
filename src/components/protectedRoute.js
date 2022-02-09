import React from 'react'
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, user, ...rest }) => (
    <Route {...rest} render={(props) => (
        user === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)
