import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';


const store = applyMiddleware(
    promiseMiddleware,
    thunk
)(createStore);
const element = document.getElementById('root');
const history = require('history').createBrowserHistory();
ReactDOM.render(<Provider store={store(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
)}>
    <Router history={history}>
        <App />
    </Router>
</Provider>, element);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
