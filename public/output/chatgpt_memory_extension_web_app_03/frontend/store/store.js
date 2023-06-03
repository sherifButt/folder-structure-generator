
// Importing dependencies
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// Creating store
const store = createStore(rootReducer, applyMiddleware(thunk));

// Exporting store
export default store;
