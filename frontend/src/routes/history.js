import Navbar from "components/NavBar"
import * as cookies from "Cookies"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function HistoryPage() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!cookies.doesUserHaveCookie())
      navigate("/login")
  }, [])


  return (
    <>
      <Navbar/>
    </>
  )
}