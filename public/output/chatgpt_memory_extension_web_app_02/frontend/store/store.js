import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

export default store;
```

This file sets up the Redux store with middleware for handling asynchronous actions using `redux-thunk`. The store is created using the `createStore` function, which takes a reducer and optional middleware as arguments. In this implementation, the rootReducer is used as the reducer and `thunkMiddleware` is used as the middleware. Finally, the store is exported for use in other parts of the application.