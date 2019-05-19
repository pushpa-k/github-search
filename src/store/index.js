import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import createSagaMiddleware from "redux-saga";

import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

let store = createStore(
    reducers,
    compose(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
