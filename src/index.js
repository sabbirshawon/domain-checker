import 'url-polyfill';
import 'react-app-polyfill/ie11';

import React from 'react';
import ReactDOM from 'react-dom';
import DomainSearch from './DomainSearch';
import queryString from 'query-string';

const elements = document.getElementsByClassName('rstore-domain-search');

Array.prototype.forEach.call(elements, element => {

  const text = {
    placeholder: element.dataset.text_placeholder || 'Enter your domain name',
    search: element.dataset.text_search || 'Search',
    available: element.dataset.text_available || 'Congrats, {domain_name} is available!',
    notAvailable: element.dataset.text_not_available || 'Sorry, {domain_name} is already taken.',
    select: element.dataset.text_select || 'Select',
    selected: element.dataset.text_selected || 'Selected'
  };

  const baseUrl = element.dataset.base_url || 'secureserver.net';
  const pageSize = element.dataset.page_size || '5';
  const parsed = queryString.parse(window.location.search);

  return ReactDOM.render(
    <DomainSearch text={text} plid={element.dataset.plid} baseUrl={baseUrl} pageSize={pageSize} domainToCheck={parsed.domainToCheck}/>,
    element
  );
});
