import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Search.css';

import { getRepository } from '../store/actions/repository';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      language: 'Javascript', // default language
      error: ''
    }
  }

  getRepositories = (e) => {
    const searchTerm = this.state.searchTerm;
    const language = this.state.language;
    e.preventDefault();
    if (searchTerm && language) {
      // pass the searchTerm to our action creator.
      this.props.getRepository(searchTerm, language);
      this.setState({ error: '' })
    } else {
      this.setState(
        { error: 'Please enter a repository name' },
        () => { this.props.onUpdate(this.state.error) }
      );
    }
  }

  handleInputChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  handleLanguageChange = (e) => {
    this.setState({ language: e.target.value });
  }

  renderLanguages = () => {
    const languages = ['Javascript', 'React', 'Redux', 'HTML', 'CSS', 'Java', 'PHP'];
    let options = languages.map((language, index) => {
       return (<option value={language} key={index}>{language}</option>);
    })
    return options;
  }

  render() {
    const isLoading = this.props.isLoading;
    const { searchTerm, error } = this.state;
    return (
      <form onSubmit={this.getRepositories.bind(this)}>
        <div className="search-wrapper">
          <label htmlFor="enterRepository">Enter repository</label>
          <input className="search-bar" id="enterRepository" type="text" value={searchTerm} onChange={this.handleInputChange} />
          <label htmlFor="selectLanguage">Select language</label>
          <select onChange={this.handleLanguageChange} id="selectLanguage" className="search-language">{this.renderLanguages()}</select>
          <button className="search-button" type="submit">Search</button>
          {error && <div className="search-error">{error}</div>}
          {isLoading && <div className="search-loader"></div>}
        </div>
      </form>
    )
  }
}

// TODO: Use selectors instead
export function mapStateToProps(state, ownProps) {
  const props = {};
  props.repositories = state.repositories.repositories;
  props.isLoading = state.repositories.loading;
  return props;
}

export default connect(mapStateToProps, { getRepository })(Search);
