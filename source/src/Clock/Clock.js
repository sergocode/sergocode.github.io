import React, { Component } from "react";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}),
    };
  }
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 10);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}),
    });
  }
  render() {
    return (
        <div className='container clock-container'>
        <h1 className='clock'>{this.state.time}</h1>
        </div>
        );
  }
}

export default Clock;