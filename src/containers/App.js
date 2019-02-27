import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import './App.css';
import Shell from './Shell'

class App extends Component{

  render(){
    return(  
    <div id="App" className={this.props.theme==="dark"?"App  Dark":"App"}>
      <Shell actions={this.props.actions}></Shell>
    </div>);
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

function mapStateToProps(state) {
  return {
    theme: state.ReactBibleReducer.theme};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)