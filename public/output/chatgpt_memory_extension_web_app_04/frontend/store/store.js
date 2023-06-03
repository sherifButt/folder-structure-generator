// Here's an example implementation of store.js using Redux:

import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

export default store;