import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Domain extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      selected: false
    };
  };

  render() {
    const {
      domain
    } = this.props.domainResult;

    const {
      text
    } = this.props;

    let content;

  

    if (domain) {
      return (
        <div className="domain-result">
          <div className="domain-name">
            { domain }
          </div>

        </div>
      );
    }

    return(<div></div>);
  }
}

Domain.propTypes = {
  domainResult: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired
}
