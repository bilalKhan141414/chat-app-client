import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Chat from './component/Chat';
import Join from './component/Join';
import Signup from './component/Auth/Signup'
import Login from './component/Auth/Login'

export default function App() {
    return (
        <Router>
            <Route path="/" exact component={Signup}/>
            <Route path="/login" exact component={Login}/>
            {/* <Route path="/chat" component={Chat}/> */}
        </Router>
    )
}
