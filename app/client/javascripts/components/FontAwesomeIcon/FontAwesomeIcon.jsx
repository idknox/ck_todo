import React from 'react';
import PropTypes from 'prop-types';
import './FontAwesomeIcon.scss'

export default class FontAwesomeIcon extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string
  };

  render() {
    return (
      <i
        className={`FontAwesomeIcon fa fa-${this.props.name} ${this.props.className}`}
        />
    )
  }
}
