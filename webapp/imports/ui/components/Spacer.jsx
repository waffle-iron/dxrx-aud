import React from 'react';

const Spacer = React.createClass({
  getMeteorData() {
    return {};
  },
  render () {
    let spacerStyle = {
      height: '3.2rem'
    };
    return(
      <div className="spacer" style={spacerStyle}></div>
    );
  }
});
export default Spacer;
