
export const Types = {
  /**
   * Action types relating to a single site. The namespace for these action types is "site/*"
   */
  Site: {
    /**
     * Fetch a single site. This will kick off the job that actually goes and fetches a site.
     */
    FETCH: 'site/fetch',
    /**
     * A single site has been fetched
     */
    FETCHED: 'site/fetched',
    /**
     * Retry fetching a site
     */
    RETRY: 'site/retry',
    /**
     * Dispatch action to get a single site by ID (not URL)
     */
    GET: 'site/get',
    /**
     * Dispatch action indicating that a single site should be selected from the store.
     */
    SELECT: 'site/select',
    /**
     * Dispatch action indicating that a single site has been selected from the store. 
     * (may not need this)
     */
    SELECTED: 'site/selected',
    /**
     * Dispatch action to save a single site
     */
    SAVE: 'site/save',
    /**
     * Dispatch action indicating a site has been saved. Payload should include the result.
     */
    SAVED: 'site/saved',
    /**
     * Dispatch action to delete a site
     */
    DELETE: 'site/delete',
    /**
     * Dispatch action indicating the site has been deleted. Payload should include the result.
     */
    DELETED: 'site/deleted',
  },
  /**
  * Action types relating to loading lists of sites. The namespaces for these action types is "sites/*"
  */
  Sites: {
    /**
     * Dispatch an action to fetch a single site by ID (not by URL)
     */
    GET: 'sites/get',
    /**
     * The list of sites has been loaded. This will be dispatched when a list of all sites is returned
     * or when the results of a search is returned.
     */
    LOADED: 'sites/loaded',
    /**
     * Dispatch action indicating we are searching for sites by certain criteria. 
     * The payload should contain the criteria.
     */
    SEARCH: 'sites/search'
  }
};

const transformSite = (rawSite, includeContent = false) => {
  const site = {
    ...rawSite,
    id: rawSite._id
  };

  delete site._id;
  delete site.__v;

  if (!includeContent) {
    delete site.content;
  }
  return site;
};

export const listSites = () => ({
  type: Types.Sites.GET,
  payload: {}
});

export const getSiteByIdAction = (id, includeContent = false, preview = false) => ({
  type: Types.Site.GET,
  payload: {
    includeContent,
    preview,
    site: {
      id
    }
  }
});

export const siteSelectedAction = (site, includeContent = false, preview = false) => {
  let newSite = transformSite(site, includeContent);
  return {
    type: Types.Site.SELECTED,
    payload: {
      includeContent,
      preview,
      site: newSite
    }
  };
};

/**
 * Dispatches the action that calls the API to attempt to fetch a new site.
 */
export const fetchSiteAction = (url) => ({
  type: Types.Site.FETCH,
  payload: {
    url
  }
});

export const siteFetchingAction = (site) => {
  const newSite = transformSite(site);

  return {
    type: Types.Site.FETCHED,
    payload: {
      site: newSite
    }
  };
};

export const deleteSiteAction = (id) => ({
  type: Types.Site.DELETE,
  payload: {
    site: {
      id
    }
  }
});

export const siteDeletedAction = (id) => {
  return {
    type: Types.Site.DELETED,
    payload: {
      site: {
        id
      }
    }
  };
};

/**
 * Create a search query for sites. Not going to do anything too elaborate for this study.
 * @param {*} query An object that can be turned into a key/value pair query string. Can be null.
 */
export const searchSitesAction = (query) => {
  return {
    type: Types.Sites.SEARCH,
    payload: {
      query
    }
  };
};

export const sitesLoadedAction = (sites) => {
  const newSites = sites.map(site => transformSite(site));
  return {
    type: Types.Sites.LOADED,
    payload: {
      newSites
    }
  };
};