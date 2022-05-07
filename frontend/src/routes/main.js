import Navbar from "components/NavBar"
import TopicsWriter from "components/TopicsWriter"
import * as cookies from "Cookies"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as snackbars from "Snackbar"

export default function MainPage() {
  const navigate = useNavigate()
  const [snackbarSettings, setSnackbarSettings] = useState(snackbars.getDefaultSnackbarSettings())

  useEffect(() => {
    if (!cookies.doesUserHaveCookie())
      navigate("/login")
  }, [])


  return (
    <>
      {snackbars.getSnackBarJSX(snackbarSettings, setSnackbarSettings)}
      <Navbar/>
      <TopicsWriter setSnackbarSettings={setSnackbarSettings}/>
    </>
  )
}