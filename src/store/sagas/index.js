import { all, takeLatest } from "redux-saga/effects";

import { GET_REPOSITORY } from "../actions/actionTypes";

import { searchRepositories } from "./repository";

export default function* rootSaga() {
  yield all([
    takeLatest(GET_REPOSITORY, searchRepositories)
  ]);
}
