import React from 'react';
import { shallow } from 'enzyme';
import RepositoryListContainer, { RepositoryList } from './RepositoryList';

import configureMockStore from "redux-mock-store";
import mapStateToProps from './RepositoryList';
const mockStore = configureMockStore();
const initialState = {
  repositories: {
    repositories: [{
      description: "Grow Open Source",
      forkCount: 418,
      link: "https://github.com/gitcoinco/web",
      name: "gitcoinco/web",
      stars: 733
    }],
    loading: false
  }
};

let store = mockStore(initialState);

describe('RepositoryList', () => {
  it('should render RepositoryList component', () => {
     const wrapper = shallow(<RepositoryListContainer store={store} />).find(RepositoryList);
     expect(wrapper.length).toEqual(1)
  });

  it('check Prop matches with initialState', () => {
    const wrapper = shallow(<RepositoryListContainer store={store} />).find(RepositoryList);
    expect(wrapper.prop('repositories')).toEqual(initialState.repositories.repositories);
  });

  // Todo: Add more tests. Currently, redux-connected component is being translated into ConnectFunction :
  // https://github.com/airbnb/enzyme/issues/2107
})
