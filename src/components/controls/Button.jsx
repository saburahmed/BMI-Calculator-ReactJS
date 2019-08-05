import React from 'react';

export default class Button extends React.Component {
  constructor(props) { super(props); }

  render() {
    return (
      <div className='button' onClick={ this.props.onclick }>
        { this.props.text }
      </div>
    );
  }
}