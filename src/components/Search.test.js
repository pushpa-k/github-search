import React from 'react';
import { shallow } from 'enzyme';
import { Search } from './Search';

describe('Search', () => {
  it('should render Search Form without any errors', () => {
     const wrapper = shallow(<Search />);
		 expect(wrapper.find('.search-bar').length).toEqual(1);
	 	 expect(wrapper.find('.search-language').length).toEqual(1);
		 expect(wrapper.find('.search-button').length).toEqual(1);
  });

  it('updates search term on change with default language', () => {
    const wrapper = shallow(<Search />);
    wrapper.setState({ searchTerm: '', language: 'JavaScript', error: '' });
    const event = {target: {value: "tetris"}};
	  wrapper.find('.search-bar').simulate('change',  event);
    expect(wrapper.state('searchTerm')).toEqual('tetris');
	});

  it('updates language from dropdown menu', () => {
    const wrapper = shallow(<Search />);
    wrapper.setState({ searchTerm: '', language: 'JavaScript', error: '' });
    const event = {target: {value: "Java"}};
    wrapper.find('.search-language').simulate('change', event);
    expect(wrapper.state('language')).toEqual('Java');
  });

  it('display error on empty search', () => {
    const wrapper = shallow(<Search />);
    wrapper.setProps({ onUpdate: () => {} })
    wrapper.setState({ searchTerm: '', language: 'JavaScript', error: '' });
    const event = { preventDefault: () => {}};
    wrapper.find('form').simulate('submit', event);
    expect(wrapper.state('error')).toEqual('Please enter a repository name');
  });
})
