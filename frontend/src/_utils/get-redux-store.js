import { compose, createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
 
import persistState from 'redux-localstorage';

import reducers from '../reducers';

const enhancer = compose(  persistState(/*paths, config*/), );
    
/* eslint-disable no-underscore-dangle */
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store =  createStore(reducers, {},
         composeEnhancers(applyMiddleware(reduxThunk), enhancer));

 
 export default store;