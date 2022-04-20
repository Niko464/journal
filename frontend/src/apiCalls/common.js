export async function makeAPIRequest(url, options, successCallback, failCallback) {
  await fetch(url, options)
    .then(async (response) => {
      if (response.status === 204) {
        successCallback()
        return
      }
      let json = await response.json()
      if (!response.ok) {
        failCallback(json, response.status)
        throw Error()
      }
      return json;
    })
    .then(json => successCallback(json))
    .catch(() => {})
}

export function makePromiseAPIRequest(url, options) {
  return new Promise((resolve, reject) => {
    makeAPIRequest(url, options, resolve, reject)
  })
}