import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import Register from './register';
import Welcome from './welcome';
import Login from './login'
import App from './app'
import Profile from './profile';
import OtherUserProfile from './other-user-profile'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';
import Friends from './friends';
import Online from './online';
// import Chat from './chat';
import { getSocket } from './socket';



const store = createStore(reducer,
composeWithDevTools(applyMiddleware(reduxPromise)))



const notLoggedInRouter = (
    <Router history={hashHistory}>
        <Route path="/" component={Welcome}>
            <Route path="/login" component={Login} />
            <IndexRoute component={Register} />
  	    </Route>
    </Router>
);


const loggedInRouter = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Profile} />
                <Route path="user/:id" component={OtherUserProfile} />
                <Route path="/friends" component={Friends} />
                <Route path="/online" component={Online} />
                {/* <Route path="/chat" component={Chat} /> */}
      	    </Route>
        </Router>
    </Provider>
);

let router;


if (location.pathname === '/welcome/') {
    // console.log('about to use not logged in router');
    router = notLoggedInRouter
} else {
    // console.log('about to use LOGGED in router');
    router = loggedInRouter
}

export default store


ReactDOM.render( router, document.querySelector('main'));
