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

  post(endpoint, payload, callback) {
    axios
      .post(this.apiPath(endpoint), payload, this.requestConfig)
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
      });
  }

  patch(endpoint, payload, callback) {
    axios
      .patch(this.apiPath(endpoint), payload, this.requestConfig)
      .then(response => {
        callback(response.data)
      })
      .catch(error => {
      });
  }

  destroy(endpoint, callback) {
    axios
      .delete(this.apiPath(endpoint), this.requestConfig)
      .then(response => {
        callback(response.data, 'remove')
      })
      .catch(error => {
      });
  }
}