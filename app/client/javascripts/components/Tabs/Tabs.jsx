import React from 'react';
import PropTypes from 'prop-types';
import './Tabs.scss'

export default class Tabs extends React.Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    activateView: PropTypes.func.isRequired,
    activeView: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.activateView = this.activateView.bind(this);
  }

  activateView(e) {
    this.props.activateView(e.target.innerText);
  }

  render() {
    return (
      <div className="Tabs">
        {this.props.options.map((option, i) =>
          <div
            key={i}
            className={`Tab ${ option === this.props.activeView ? 'active' : ''}`}
            onClick={this.activateView}
          >
            {option}
          </div>
        )}
      </div>
    )
  }
}