import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Chat from './component/Chat';
import Join from './component/Join';

export default function App() {
    return (
        <Router>
            <Route path="/" exact component={Join}/>
            <Route path="/chat" component={Chat}/>
        </Router>
    )
}
