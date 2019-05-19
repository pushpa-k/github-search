import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RepositoryList from './components/RepositoryList/RepositoryList';
import Search from './components/Search';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  state = {
    error: ""
  }

  onUpdate = (event) => {
    this.setState({ error: event });
  }

  render() {
    return (
        <div className="App">
          <h2>Github Repository Search</h2>
          <Search onUpdate={this.onUpdate} />
          <RepositoryList isSearchEmpty={this.state.error} />
        </div>
    );
  }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
