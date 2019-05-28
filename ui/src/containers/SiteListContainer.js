import React from 'react'
import { connect } from 'react-redux';
import SiteList from '../components/SiteList';
import {
  deleteSiteAction,
  fetchSiteAction
} from '../modules/sites/actions';

const mapStateToProps = (state) => {
  return {
    sites: state.sites.sites
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: (id) => deleteSiteAction(id),
    onResubmit: (url) => fetchSiteAction(url)
  };
};

const SiteListContainer = connect(mapStateToProps, mapDispatchToProps)(SiteList);

export default SiteListContainer
