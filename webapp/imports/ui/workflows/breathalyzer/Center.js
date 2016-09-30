import React from 'react';

export default class Center extends React.Component {

  render() {
    console.log('In Center render');
    var spacing = (typeof (this.props.spacing) === 'undefined') ? '0px' : this.props.spacing;
    var beforeSpacing = (typeof (this.props.beforeSpacing) === 'undefined') ? '0px' : this.props.beforeSpacing;
    var afterSpacing = (typeof (this.props.afterSpacing) === 'undefined') ? '0px' : this.props.afterSpacing;
    var children = this.props.children;
    var val = [];
    if (Array.isArray(this.props.children)) {
      for (var i = 0; i < children.length; ++i) {
        val.push(<img src='Transparent.gif' height={(i==0) ? beforeSpacing : spacing} width={1} />);
        val.push(<div style={{display: 'flex',flex: 1, flexWrap: 'wrap', flexDirection: 'row',
                justifyContent: 'space-around'}}>
                {children[i]}
                </div>);
      }
      val.push(<img src='Transparent.gif' height={afterSpacing} width={1} />);
    } else {
      val.push(<img src='Transparent.gif' height={beforeSpacing} width={1} />);
      val.push(<div style={{display: 'flex',flex: 1,flexWrap: 'wrap', flexDirection: 'row',
                justifyContent: 'space-around'}}>
                {children}
              </div>);
      val.push(<img src='Transparent.gif' height={afterSpacing} width={1} />);
    }
    return (
      <div style={{display: 'flex',flex: 1, flexDirection: 'column',
        justifyContent: 'space-around', position: 'relative', alignItems: 'center',
        width: '100%', minWidth: '100%', maxWidth: '100%'}}>
        {val}
      </div>
    );
  }
}

Center.propTypes = {
  spacing: React.PropTypes.string,
  beforeSpacing: React.PropTypes.string,
  afterSpacing: React.PropTypes.string
};
