import Cookies from "js-cookie"
import jwt_decode from "jwt-decode"

export function setSessionCookie(token) {
    Cookies.remove("user")
    Cookies.set("user", token, {expires: 1})
}

export function doesUserHaveCookie() {
    return !(Cookies.get("user") === undefined)
}

export function getUsernameFromToken(token) {
    return jwt_decode(token).username
}

export function getUserCookie() {
    return (Cookies.get("user"))
}

export function removeUserCookie() {
    Cookies.remove("user")
}