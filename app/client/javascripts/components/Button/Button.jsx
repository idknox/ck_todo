import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss'

export default class Button extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string
  };

  render() {
    return (
      <button
        className={`Button ${this.props.className}`}
        type={this.props.type}
        onClick={this.props.onClick}
      >
        {this.props.label}
      </button>
    )
  }
}