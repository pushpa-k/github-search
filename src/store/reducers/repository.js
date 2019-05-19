import {
    GET_REPOSITORY,
    GET_REPOSITORY_SUCCESS,
    GET_REPOSITORY_FAIL
} from "../actions/actionTypes";

const initialState = {
    repositories: {},
    loading: false,
    error: ""
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_REPOSITORY:
        return {
            ...state,
            loading: true
        };
    case GET_REPOSITORY_SUCCESS:
        return {
            ...state,
            repositories: { ...action.payload },
            loading: false
        };
    case GET_REPOSITORY_FAIL:
        return {
            ...state,
            loading: false,
            error: action.payload
        };
    default:
       return state;
  }
}
