import Qs from 'qs';
import { from } from 'rxjs';
import Axios from 'axios';

const BASE_URI = 'http://localhost:3001/jobs';

const qs = (params = {}) => {
  if (Object.keys(params).length > 0) {
    return '?' + Qs.stringify(params, { arrayFormat: 'brackets' });
  }
  return '';
};

const url = (path, params = {}) => {
  if (path.startsWith('http')) {
    return path + qs(params);
  }

  if (!path.startsWith('/')) {
    path = `/${path}`;
  }

  if (path.endsWith('/')) {
    path = path.substring(0, path.lastIndexOf('/'));
  }

  let url = BASE_URI + path;

  return url + qs(params);
};

export default {
  get: (path, params = {}) => {
    return from(Axios.get(url(path, params)));
  },
  post: (path, payload) => {
    return from(Axios.post(url(path), payload));
  },
  put: (path, payload, params = {}) => {
    return from(Axios.put(url(path, params), payload));
  },
  delete: (path, params = {}) => {
    return from(Axios.delete(url(path, params)));
  }
}