import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const SiteListItem = props => {
  const {
    site,
    onDelete,
    onResubmit,
    key
  } = props;

  return (
    <ListItem key={key}>
      <ListItemText primary={site.url} secondary={site.status} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="Delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

SiteListItem.propTypes = {
  site: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onResubmit: PropTypes.func,
  key: PropTypes.string
};

export default SiteListItem
