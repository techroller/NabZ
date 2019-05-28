import React, {Component} from 'react'
import {connect} from 'react-redux';
import Container from '@material-ui/core/Container';
import UrlInput from './UrlInput';
import SiteList from './SiteList';
import { fetchSiteAction, deleteSiteAction, getSiteByIdAction, listSites } from '../modules/sites/actions';

class Body extends Component {

  constructor(props) {
    super(props);

    this.state = {
      url: ''
    };
  }

  handleUrlChanged = (e) => {
    const url = e.target.text;
    this.setState({
      url
    });
  }

  handleSubmitSite = () => {
    this.props.submitSite(this.state.url);
  }

  handleDelete = (id) => {
    this.props.handleDelete(id);
  }

  componentDidMount = () => {
    this.props.loadSites();
  }

  render = () => {
    return (
      <Container component="main" maxWidth="md" style={{ margin: "32px auto" }}>
        <UrlInput onUrlChanged={this.handleUrlChanged} onSubmitSite={this.handleSubmitSite} />

        <SiteList onDelete={this.handleDelete} sites={this.props.sites} />

      </Container>
    );    
  }
}

const mapStateToProps = (state) => {
  return {
    sites: state.sites.sites
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmitSite: (url) => dispatch(fetchSiteAction(url)),
    handleDelete: (id) => dispatch(deleteSiteAction(id)),
    handlePreview: (id) => {
      dispatch(getSiteByIdAction(id, true, true));
    },
    loadSites: () => dispatch(listSites())
  }
}

const BodyContainer = connect(mapStateToProps, mapDispatchToProps)(Body);

export default BodyContainer;