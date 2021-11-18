import './App.css';

import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {

  state = {
    progress:0
  }

  setProgress = (progress)  => {
    this.setState({
      progress:progress
    })
  }

  render() {
    return (
      <div>
      <LoadingBar
        color='#ac00e6'
        height={4}
        progress={this.state.progress}
        
      />
      <Navbar/>
      <News pageSize={6} setProgress={this.setProgress}/>
      </div>
    )
  }
}

