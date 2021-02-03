/* npm i -s redux react-redux redux-thunk redux-logger redux-devtools-extension*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.scss';
import {applyMiddleware, createStore} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// dev tools
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
