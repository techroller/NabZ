import React from 'react'
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import SiteListItem from './SiteListItem';

const SiteList = (props) => {
  const {
    sites,
    onDelete,
    onResubmit
  } = props;
  return (
    <List>
      {sites.map(site => (
        <SiteListItem site={site}
          onDelete={() => onDelete(site.id)}
          onResubmit={() => onResubmit(site.url)}
          key={site.id} />
      ))}
    </List>
  )
}

SiteList.propTypes = {
  sites: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func.isRequired,
  onResubmit: PropTypes.func.isRequired
};

export default SiteList
