import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {Provider} from 'react-redux';
import App from './App';
import configureStore, {initialState} from './store';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

const containerId = "app";
const appHistory = createHistory();
const store = configureStore(initialState);

render(
  <Provider store={store}>
    <BrowserRouter history={appHistory}>
      <Route path="/" component={App}/>
    </BrowserRouter>
  </Provider>,
  document.getElementById(containerId)
);
