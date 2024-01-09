// import { createStore, applyMiddleware } from "redux";
// import {thunkMiddleware} from "redux-thunk";

// import rootReducer from "../reducers";

// const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// export default store;

// -----------------------------------------------------------------------------------------------

import { createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk"; // Importing the thunk middleware

import rootReducer from "../reducers";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;


// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk"; // Importing the thunk middleware

// import rootReducer from "../reducers";

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;



