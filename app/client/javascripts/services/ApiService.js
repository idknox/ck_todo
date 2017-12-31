import axios from 'axios';

export default class ApiService {
  requestConfig = {
    responseType: 'json',
    headers: ReactOnRails.authenticityHeaders(),
  };

  apiPrefex = 'api';

  apiPath(endpoint) {
    return `${this.apiPrefex}/${endpoint}`
  }

  get(endpoint, callback) {
    axios.get(this.apiPath(endpoint), this.requestConfig)
      .then(response => {
        callback(response.data)
      })
      .catch(error => {
      });
  }
}