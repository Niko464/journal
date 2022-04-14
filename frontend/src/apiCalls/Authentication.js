import { makeAPIRequest } from "apiCalls/common"

export async function askServerToSignup(username, email, password, successCallback, failCallback) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: username,
      password: password,
      mail: email
    })
  }
  await makeAPIRequest(`http://` + process.env.BACKEND_HOST + `:8080/api/auth/signup`, options, successCallback, failCallback)
}

export async function askServerToLogin(email, password, successCallback, failCallback) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      mail: email,
      password: password
    })
  }
  await makeAPIRequest(`http://` + process.env.BACKEND_HOST + `:8080/api/auth/login`, options, successCallback, failCallback)
}