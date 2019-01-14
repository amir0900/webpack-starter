//mange older browser fetch
import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill';

// api call service
export const restApi = {

    // generic get msg
  get: function (url, params) {
    return window.fetch(url)
      .then(function (response) {
        return response.json()
      })
      .catch(e => {
        console.log(e)})
  },

  // generic post msg
  post: function (url,configData) {
    window.fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(configData), // body data type must match "Content-Type" header
    })
  }
}
