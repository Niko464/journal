import Navbar from "components/NavBar"
import { TopicsManager } from "components/TopicsManager"
import * as cookies from "Cookies"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as snackbars from "Snackbar"

export default function TopicsPage() {
  const navigate = useNavigate()
  const [snackbarSettings, setSnackbarSettings] = useState(snackbars.getDefaultSnackbarSettings())

  useEffect(() => {
    if (!cookies.doesUserHaveCookie())
      navigate("/login")
  }, [])


  return (
    <div style={{height: "100%", background: "transparent"}}>
      {snackbars.getSnackBarJSX(snackbarSettings, setSnackbarSettings)}
      <Navbar/>
      <TopicsManager setSnackbarSettings={setSnackbarSettings}/>
    </div>
  )
}