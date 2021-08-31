import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SearchResults from './SearchResults';

import util from './util';

const initialState = {
  results: null,
  searching: false,
  submitting: false,
  error: '',
  selectedDomains: [],
  hasError: false,
  domain: ''
};

export default class DomainSearch extends Component {
  constructor() {
    super(...arguments);

    this.handleChange = this.handleChange.bind(this);
    this.handleDomainSearch = this.handleDomainSearch.bind(this);

    this.state = initialState;
  };

  componentDidMount() {
    if (this.props.domainToCheck) {
      this.setState({ domain: this.props.domainToCheck });
      this.search(this.props.domainToCheck);
    }
  }

  handleChange(event) {
    this.setState({ domain: event.target.value });
  }

  search(q) {
    const {
      baseUrl,
      plid,
      pageSize
    } = this.props;

    this.setState({ searching: true });

    const domainUrl = `https://www.${baseUrl}/api/v1/domains/${plid}/`;

    return util.fetchJsonp(domainUrl, { pageSize, q }).then(data => {
        this.setState({
          results: data.exactMatchDomain ? data : null,
          error: data.error ? data.error.message : '',
          searching: false
        });
      }).catch(error => {
        this.setState({
          searching: false,
          error: error.message
        });
      });
  }

  handleDomainSearch(e) {
    e.preventDefault();
    if (this.state.domain.length > 0) {
      this.search(this.state.domain);
    }
  }

  handleSelectClick(domainObj) {
    const { selectedDomains } = this.state;

    const index = selectedDomains.indexOf(domainObj.props.domainResult);
    let newSelectDomains = [];

    if (index >= 0 ){
      newSelectDomains = [
        ...selectedDomains.slice(0, index),
        ...selectedDomains.slice(index + 1)
      ];

      domainObj.setState({
        selected: false,
      });
    }
    else {
      newSelectDomains = [
        ...selectedDomains,
        domainObj.props.domainResult
      ];

      domainObj.setState({
        selected: true,
      });
    }

    this.setState({ selectedDomains: newSelectDomains });
  }

  render() {
    const {
      baseUrl,
      plid,
      text
    } = this.props;

    const {
      searching,
      submitting,
      results,
      selectedDomains,
      error
    } = this.state;

    const domainCount = selectedDomains.length;
    const hasExactMatch = results && results.exactMatchDomain && results.exactMatchDomain.available;

    window.onbeforeunload = () => {
      return !submitting && (hasExactMatch || domainCount > 0) ? '' : undefined;
    };

    return (
      <Fragment>
        <div className="form-container">
          <form className="search-form" onSubmit={ this.handleDomainSearch }>
            <input
              type="search"
              value={ this.state.domain }
              onChange={ this.handleChange }
              className="search-field"
              placeholder={ text.placeholder }
            />
            <input
              type="submit"
              className="rstore-domain-search-button search-submit btn btn-primary"
              disabled={ searching || submitting }
              value={ text.search }
            />
          </form>
        </div>

        { error && <div className="rstore-error">Error: { error }</div> }
        { (searching || submitting) && <div className="rstore-loading"></div> }
        { results && <SearchResults results={ results } text={ text }/> }
      </Fragment>
    );
  }
}

DomainSearch.propTypes = {
  plid: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
  baseUrl: PropTypes.string.isRequired
}