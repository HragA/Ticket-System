import React from 'react';
import { Switch, Route } from 'react-router-dom'
import ReactDOM from 'react-dom';
import {
    getFromStorage,
    setInStorage,
} from '../utils/storage';
import { Provider } from 'react-redux';
import store from '../store';

// Components
import AppNavbar from './AppNavbar';
import Validate from './Validate';
import Home from './Home';
import Client from './Client';

// CSS
import './Home.css';

export default class SwitchRoute extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <div className="Home_CSS">
                    {/* <AppNavbar /> */}
                    <Switch>
                        <Route exact path='/' component={Home} />
                            <Route path='/validate/:id' component={Validate} />
                        {/* <Provider store={store}> */}
                            <Route path='/client' component={Client} />
                        {/* </Provider> */}
                        {/* <Route exact path='/' Component={AppNavbar}>
                            <Route path='/home' component={Home} />
                            <Route path='/validate' component={Validate} />
                        </Route> */}
                    </Switch>
                </div>
            </Provider>
        );
    }
}