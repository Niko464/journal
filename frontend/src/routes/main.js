import Navbar from "components/NavBar"
import TopicsWriter from "components/TopicsWriter"
import * as cookies from "Cookies"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function MainPage() {

  const navigate = useNavigate()

  useEffect(() => {
    if (!cookies.doesUserHaveCookie())
      navigate("/login")
  }, [])


  return (
    <>
      <Navbar/>
      <TopicsWriter />
    </>
  )
}