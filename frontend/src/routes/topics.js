import Navbar from "components/NavBar"
import { TopicsManager } from "components/TopicsManager"
import * as cookies from "Cookies"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function TopicsPage() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!cookies.doesUserHaveCookie())
      navigate("/login")
  }, [])


  return (
    <>
      <Navbar/>
      <TopicsManager />
    </>
  )
}