import React from 'react';
import PropTypes from 'prop-types';
import Domain from './Domain';
import ExactDomain from './ExactDomain';

const SearchResults = ({ results, plid, text, baseUrl }) => {
  const {
    exactMatchDomain,
    suggestedDomains,
  } = results;

  return (
    <div className="result-content">
      <ExactDomain domainResult={ exactMatchDomain } text={ text } />
      <p className="suggestion-txt">Here are some other available domains based on your keywords - select one below:</p>
      <div className="rstore-exact-domain-list">
        <Domain domainResult={ exactMatchDomain } text={ text } />
      </div>
      <div className="rstore-domain-list">
        { suggestedDomains && suggestedDomains.map((domainResult, index) => {
          return domainResult.available && (<Domain key={ index } domainResult={ domainResult } text={ text }/>);
        })}
      </div>
  
    </div>
  );
};

SearchResults.propTypes = {
  results: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired
}

export default SearchResults;
