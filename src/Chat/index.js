import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../App';
import User from './User';

import Group from './Group';

import { HashRouter, Route } from 'react-router-dom'
import * as registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<HashRouter>
<div>
    
    <Route exact path="/" component={App}></Route>
    <Route exact path="/group/" component={Group}></Route>
    <Route exact path="/chat" name="chat" component={Chat}></Route></div>
</HashRouter>, document.getElementById('root'));
registerServiceWorker.unregister();