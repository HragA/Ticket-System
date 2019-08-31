import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware)
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

// Only chrome can handle the redux dev tool
// redux compose cannot handle a null or undefined middleware
// if (window.navigator.userAgent.includes('Chrome')) {
//     const store = createStore(
//         rootReducer,
//         initialState,
//         compose(
//             applyMiddleware(routerMiddleware(browserHistory)),
//             window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//         )
//     );
// }
// else {
//     const store = createStore(
//         rootReducer,
//         initialState,
//         compose(
//             applyMiddleware(routerMiddleware(browserHistory))
//         )
//     );
// }

export default store;