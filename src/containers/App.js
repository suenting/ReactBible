import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import Book from '../components/Book'
import Navigation from '../components/Navigation'
import './App.css';

const App = ({ actions }) => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">Welcome to React Bible</h1>
    </header>
    <Navigation actions={actions} />
    <Book actions={actions} />
  </div>
);

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)