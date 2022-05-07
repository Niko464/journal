import { makePromiseAPIRequest } from "apiCalls/common"
import * as cookies from "Cookies"

export function createServerSideArticle(topics, text, date) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookies.getUserCookie()
        },
        body: JSON.stringify({
            topics: topics,
            text: text,
            date: date
        })
    }
    return makePromiseAPIRequest(`http://localhost:8081/api/articles`, options)
}