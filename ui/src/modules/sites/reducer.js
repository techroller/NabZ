import {filter} from 'lodash/filter';
import {findIndex} from 'lodash/findIndex';

import { Types } from './actions'

export default (state = {sites: [], selected: {preview: false}}, action = {}) => {

  switch (action.type) {
    case Types.Sites.LOADED:
      let newState = {
        ...state,
        sites: action.payload.sites
      }
      return newState;
    case Types.Site.DELETED:
      newState = {
        ...state
      };

      let sites = filter(state.sites, (site) => site.id !== action.payload.site.id);
      newState.sites = sites;
      return newState;
    case Types.Site.FETCHED:
      sites = [...state.sites];
      let site = {
        ...action.payload.site
      };

      const ix = findIndex(sites.index, s => s.id === site.id);
      sites[ix] = site;

      return {
        ...state,
        sites
      };
    case Types.Site.SELECTED:
      newState = {
        ...state,
        selected: {
          ...action.payload.site,
          preview: action.payload.preview !== undefined ? action.payload.preview : false
        }
      };
      return newState;
    default:
      return state;
  }
};