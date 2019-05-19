import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import RepositoryListItem from './RepositoryListItem';
import './RepositoryList.css';

const INITIAL_ROWS = 5;

export class RepositoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
     reposToShow: INITIAL_ROWS,
     expanded: false,
     isSearchEmpty: false
    }
    this.showMore = this.showMore.bind(this);
  }

  shouldComponentUpdate = (nextProps) => {
    if (nextProps.isSearchEmpty !== this.props.isSearchEmpty) {
      this.setState ({ isSearchEmpty: nextProps.isSearchEmpty });
    }
    return true;
  }

  componentDidUpdate = (prevProps, prevState) => {
    const currentSearch = this.props.repositories.searchTerm;
    const prevSearch =  prevProps.repositories.searchTerm;
    // Resets to 5 rows on new search
    if (prevSearch && (prevSearch !== currentSearch)) {
     this.setState({reposToShow: INITIAL_ROWS, expanded: false});
    }
  }

  showMore = () => {
    const repos = this.props.repositories;
    let repoLength = repos.length;
    this.state.reposToShow === INITIAL_ROWS ? (
      this.setState({ reposToShow: repoLength, expanded: true })
    ) : (
      this.setState({ reposToShow: INITIAL_ROWS, expanded: false })
    )
  }

  renderError = () => {
    return (!this.state.isSearchEmpty && <div className="inputError">No repositories found!</div>);
  }

  renderList = (repositories) => {
    const classes = classNames('repositoryList-button',{
                     'repositoryList-button--showMore': !this.state.expanded,
                     'repositoryList-button--showLess': this.state.expanded
                    });
    const repositoryList = repositories && repositories.map(repo => <RepositoryListItem repo={repo} key={repo.name} />);
    const repoLength = repositoryList.length;

    // If api returns no results, show status message
    if (repoLength === 0) {
      return this.renderError();
    }

    return (
      <div className="repositoryList">
        <p className="repositoryList-header">{`${repoLength} Results`}</p>
        <div className="repositoryList-wrapper">{repositoryList.slice(0, this.state.reposToShow)}</div>
        {repoLength > INITIAL_ROWS && (
          <button className={classes} onClick={this.showMore}>
            {this.state.expanded ? 'Show less' : 'Show more'}
            <span className="repositoryList-caret"></span>
          </button>)
        }
      </div>
    );
  }

  render() {
    const { repositories } = this.props.repositories;
    return repositories ? this.renderList(repositories) : null;
  }
}

// TODO: Use selectors instead
export function mapStateToProps(state, ownProps) {
  const props = {};
  props.repositories = state.repositories.repositories;
  return props;
}

export default connect(mapStateToProps)(RepositoryList);
