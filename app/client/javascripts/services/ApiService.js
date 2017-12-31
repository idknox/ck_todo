import axios from 'axios';

export default class ApiService {
  requestConfig = {
    responseType: 'json',
    headers: ReactOnRails.authenticityHeaders(),
  };

  apiPrefex = 'api';

  constructor(errorCallback) {
    this.errorCallback = errorCallback;
  }

  apiPath(endpoint) {
    return `${this.apiPrefex}/${endpoint}`
  }

  get(endpoint, callback) {
    axios.get(this.apiPath(endpoint), this.requestConfig)
      .then(response => {
        callback(response.data)
      })
      .catch(error => {
        this.errorCallback()
      });
  }

  post(endpoint, payload, callback) {
    axios
      .post(this.apiPath(endpoint), payload, this.requestConfig)
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        this.errorCallback()
      });
  }

  patch(endpoint, payload, callback) {
    axios
      .patch(this.apiPath(endpoint), payload, this.requestConfig)
      .then(response => {
        callback(response.data)
      })
      .catch(error => {
        this.errorCallback()
      });
  }

  destroy(endpoint, callback) {
    axios
      .delete(this.apiPath(endpoint), this.requestConfig)
      .then(response => {
        callback(response.data, 'remove')
      })
      .catch(error => {
        this.errorCallback()
      });
  }
}