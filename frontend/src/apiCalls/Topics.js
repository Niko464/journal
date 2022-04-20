import * as cookies from "Cookies"
import { makePromiseAPIRequest } from "apiCalls/common"

export function getTopicsList() {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookies.getUserCookie()
        }
    }
    return makePromiseAPIRequest(`http://localhost:8081/api/topics`, options)
}