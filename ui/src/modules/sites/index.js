import { ofType, combineEpics } from 'redux-observable';
import { flatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { snack } from '../snack/actions';

import {
  Types,
  sitesLoadedAction,
  siteFetchingAction,
  siteDeletedAction,
  siteSelectedAction
} from './actions';
import client from '../../services/client';

const logError = function (errors) {
  console.error(errors);
  return {
    type: "NOOP"
  };
}

// Epics
const queueFetchSiteJobEpic = (action$) => action$.pipe(
  ofType(Types.Site.FETCH),
  flatMap(action => {
    const url = action.payload.url;
    const request = { url };

    return client.post('/', request).pipe(
      flatMap(({ data }) => of(siteFetchingAction(data), snack.info(`[${url}] has been queued for processing`))),
      catchError(error => of(snack.error(`Failed to queue site [${url}] for processing.`), logError(error)))
    );
  })
);

const getSingleSiteEpic = (action$) => action$.pipe(
  ofType(Types.Site.GET),
  flatMap(action => {
    const payload = action.payload;
    const preview = payload.preview !== undefined ? payload.preview : false;
    const id = payload.site.id;
    const path = `/${id}`;
    return client.get(path).pipe(
      flatMap(response => {
        const data = response.data;
        return of(siteSelectedAction(data, payload.includeContent, preview))
      }),
      catchError(error => of(snack.error(`Failed to load site [${id}]`), logError(error)))
    );
  })
);

const listSitesEpic = (action$) => action$.pipe(
  ofType(Types.Sites.GET),
  flatMap(action => {
    const payload = action.payload;
    return client.get('/').pipe(
      flatMap(response => {
        const data = response.data;
        return of(sitesLoadedAction(data));
      }),
      catchError(error => {
        console.log(error);
        return of(snack.error(`Failed to load list of sites`), logError(error));
      })
    );
  })
);

const deleteSiteEpic = (action$) => action$.pipe(
  ofType(Types.Site.DELETE),
  flatMap(action => {
    const id = action.payload.site.id
    const path = `/${id}`;
    return client.delete(path).pipe(
      flatMap(response => of(siteDeletedAction(id), snack.success(`Site has been deleted`))),
      catchError(error => of(snack.error(`Failed to delete site with id[${id}]`), logError(error)))
    );
  })
);

export default combineEpics(
  queueFetchSiteJobEpic,
  getSingleSiteEpic,
  listSitesEpic,
  deleteSiteEpic
);