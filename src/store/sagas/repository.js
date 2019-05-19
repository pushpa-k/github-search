import { put, call } from "redux-saga/effects";
import axios from "axios";

import {
    GET_REPOSITORY_SUCCESS,
    GET_REPOSITORY_FAIL
} from "../actions/actionTypes";

const searchAPI = 'https://api.github.com/search/repositories?q='

function fetchRepositories(searchTerm, language) {
  let url = `${searchAPI}${searchTerm}+language:${language}`;

  return axios.get(url);
}

export function* searchRepositories(action) {
  let { searchTerm, language } = action.payload;
  try {
    // grab the data from the github api
    let response = yield call(fetchRepositories, searchTerm, language);
    if (response.data.items) {
        let repositories = [];

        // loop over keys in data
        for (let key in response.data.items) {
          // if data includes project name and link, add it to results
          const item = response.data.items[key];
          const fullName = item.full_name;
          const url = item.html_url;
          if (fullName && url) {
            repositories[key] = {
              name: fullName,
              link: url,
              stars: item.stargazers_count,
              description: item.description,
              forkCount: item.forks_count
            };
          }
        }

        let repoDetails = {
            ...response.data,
            repositories,
            searchTerm
        }
      yield put({ type: GET_REPOSITORY_SUCCESS, payload: repoDetails });
    }
  } catch (e) {
      yield put({ type: GET_REPOSITORY_FAIL, payload: e });
  }
}
