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

export function createServerSideTopic(topicName) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookies.getUserCookie()
        },
        body: JSON.stringify({
            topicName: topicName
        })
    }
    return makePromiseAPIRequest(`http://localhost:8081/api/topics`, options)
}

export function deleteServerSideTopic(topicName) {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookies.getUserCookie()
        }
    }
    return makePromiseAPIRequest(`http://localhost:8081/api/topics/` + topicName, options)
}