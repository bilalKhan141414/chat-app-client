import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export default function ProtectedRoute({
    isAuth,
    component: Component,
    redirectRoute = "/login",
    ...rest
}) {
    return (
        <Route 
            {...rest}
            render={ 
                (props) => {
                    if(isAuth){
                        return <Component {...props}/>
                    }
                    else {
                        return <Redirect to={{pathname:redirectRoute, state:{ from: props.location }}} />
                    }
            }}
        />
    )
}
