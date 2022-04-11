import { Typography, Box, TextField, InputAdornment, Stack, Button, Divider, Link } from "@mui/material"
import { useState, useEffect } from "react"
import { useTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import HttpsIcon from '@mui/icons-material/Https';
import EmailIcon from '@mui/icons-material/Email';
import * as snackbars from "Snackbar"
import * as cookies from "Cookies"
import { askServerToSignup } from "apiCalls/Authentication"
import { useNavigate } from "react-router";


export default function Signup() {

  const [snackbarSettings, setSnackbarSettings] = useState(snackbars.getDefaultSnackbarSettings())
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmationPassword, setConfirmationPassword] = useState("")
  const theme = useTheme();
  const navigate = useNavigate()

  const register_fields = [
    {
      name: "Username",
      type: "text",
      placeholder: "Type your username here",
      stateValue: username,
      stateFunc: setUsername,
      adornment: <PersonIcon />
    },
    {
      name: "Mail",
      type: "text",
      placeholder: "Type your mail here",
      stateValue: email,
      stateFunc: setEmail,
      adornment: <EmailIcon />
    },
    {
      name: "Password",
      type: "password",
      placeholder: "Type your password here",
      stateValue: password,
      stateFunc: setPassword,
      adornment: <HttpsIcon />
    },
    {
      name: "Confirmation Password",
      type: "password",
      placeholder: "Type your password again",
      stateValue: confirmationPassword,
      stateFunc: setConfirmationPassword,
      adornment: <HttpsIcon />
    }
  ]

  function signupSuccessCallback(json) {
    cookies.setSessionCookie(json.token)
    navigate("/")
  }

  function signupFailureCallback(error) {
    snackbars.changeSnackbarSettings("error", error.status, setSnackbarSettings)
  }

  async function handleSignupClick() {
    if (username === "") {
      snackbars.changeSnackbarSettings("error", "Username can't be empty.", setSnackbarSettings)
      return
    }
    if (username.length < 5 || username.length > 16) {
      snackbars.changeSnackbarSettings("error", "Username must be between 5 and 16 characters long.", setSnackbarSettings)
      return
    }
    if (email === "") {
      snackbars.changeSnackbarSettings("error", "Email can't be empty.", setSnackbarSettings)
      return
    }
    if (!email.match(/[a-zA-Z0-9]+[@]+[a-zA-Z0-9]+[.]+[a-zA-Z]/g)) {
      snackbars.changeSnackbarSettings("error", "Invalid email address.", setSnackbarSettings)
      return
    }
    if (password === "") {
      snackbars.changeSnackbarSettings("error", "Password cannot be empty.", setSnackbarSettings)
      return
    }
    if (password.length < 5 || password.length > 16) {
      snackbars.changeSnackbarSettings("error", "Password must be between 5 and 16 characters long.", setSnackbarSettings)
      return
    }
    if (password !== confirmationPassword) {
      snackbars.changeSnackbarSettings("error", "Your two passwords don't match.", setSnackbarSettings)
      return
    }
    await askServerToSignup(username, email, password, signupSuccessCallback, signupFailureCallback)
  }

  useEffect(() => {
    if (cookies.doesUserHaveCookie()) {
      navigate("/")
    }
  })

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row"
      }}>
      <Box flexItem sx={{ flexGrow: 1 }}></Box>
      <div
        style={{
          flexGrow: 1,
          height: "100vh",
          display: "flex",
          alignItems: "center"
        }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            height: "55%",
            borderRadius: "15px",
            border: "2px solid",
            borderColor: theme.palette.primary.main,
            alignItems: "center",
          }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              flexGrow: 1,
              alignItems: "center"
            }}>
            <Typography
              sx={{
                fontSize: "40px",
                color: "white"
              }}>Area - Signup</Typography>
            <Divider
              orientation="horizontal"
              variant="middle"
              flexItem
              sx={{
                marginBottom: "15px",
                backgroundColor: "gray"
              }} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              flexGrow: 3,
              alignItems: "center"
            }}>
            <Stack
              spacing={3}
              sx={{
                alignItems: "center",
                width: "100%"
              }}>
              {register_fields.map((elem) => {
                return (
                  <TextField
                    autoComplete="off"
                    key={elem.name}
                    className="input-txt-field"
                    label={elem.name}
                    type={elem.type}
                    placeholder={elem.placeholder}
                    value={elem.stateValue}
                    onChange={(event) => elem.stateFunc(event.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position={'start'}>
                          {elem.adornment}
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      width: "60%"
                    }}
                  />
                )
              })}

              <Button
                variant="outlined"
                id="signup-btn"
                onClick={handleSignupClick}
                sx={{
                  font: "Kayak",
                  fontSize: "20px",
                  color: "white",
                  margin: "0px 10px",
                  borderColor: theme.palette.primary.main,
                  borderRadius: "10px",
                  transition: "all .2s ease-in-out",
                  width: "60%",
                  fontWeight: "600",
                  "&:hover": {
                    background: theme.palette.primary.main,
                    borderRadius: "10px",
                    transform: "scale(1.05, 1.1)",
                    fontSize: "20px",
                    color: "#1E2329"
                  }
                }}>Signup</Button>
              <div
                style={{
                  display: "flex",
                  width: "60%",
                }}>
                <Link
                  href="/login"
                  sx={{
                    color: "white",
                    marginLeft: "auto"
                  }}>Already have an account ?</Link>
              </div>
            </Stack>
          </div>
        </div>
      </div>
      <Box flexItem sx={{ flexGrow: 1 }}></Box>
      {snackbars.getSnackBarJSX(snackbarSettings, setSnackbarSettings)}
    </div >
  )
}