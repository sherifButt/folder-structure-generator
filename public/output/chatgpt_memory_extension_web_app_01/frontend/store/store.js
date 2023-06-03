
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

export default store;
```

Here, we import `createStore` from the `redux` library and our `rootReducer` from the `reducers` file. We then create the store by passing the `rootReducer` to `createStore()` and assign it to the `store` constant. Finally, we export the `store` constant as the default export of this module.