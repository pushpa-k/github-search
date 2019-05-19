import React from 'react';
import { shallow } from 'enzyme';
import RepositoryListItem from './RepositoryListItem';

let repo = {
  description: "",
  forkCount: 0,
  link: "https://github.com/gitcoinco/web",
  name: "gitcoinco/web",
  stars: 733
};

describe('RepositoryListItem', () => {
  it('should render repository name and url', () => {
     const wrapper = shallow(<RepositoryListItem repo={repo}/>);
		 expect(wrapper.find('.repositoryListItem-name').text()).toEqual('gitcoinco/web');
     expect(wrapper.find('a').text()).toEqual('gitcoinco/web');
     expect(wrapper.find('.repositoryListItem-description').text()).toEqual('');
  });

  it('should render description', () => {
    let repo = { description: "Grow Open Source" };
     const wrapper = shallow(<RepositoryListItem repo={repo}/>);
		 expect(wrapper.find('.repositoryListItem-description').text()).toEqual('Grow Open Source');
  });

  it('should render star and fork count', () => {
     let repo = { forkCount: 418 };
     let wrapper = shallow(<RepositoryListItem repo={repo}/>);
		 expect(wrapper.find('.repositoryListItem-data').text()).toEqual('418');
     repo.stars = 200;
     wrapper = shallow(<RepositoryListItem repo={repo}/>);
     expect(wrapper.find('.repositoryListItem-data').text()).toEqual('200418');
  });


})
