import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import './App.css';
import Shell from './Shell'

const App = ({ actions }) => (
  <div className="App">
    <Shell actions={actions}></Shell>
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