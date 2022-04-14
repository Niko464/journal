import { Typography, Box, TextField, InputAdornment, Stack, Button, Divider, Link } from "@mui/material"
import { useState, useEffect } from "react"
import { useTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import * as snackbars from "Snackbar"
import * as cookies from "Cookies"
import { askServerToLogin } from "apiCalls/Authentication"
import { useNavigate } from "react-router";

export default function Login() {

  const [snackbarSettings, setSnackbarSettings] = useState(snackbars.getDefaultSnackbarSettings())
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const theme = useTheme()
  const navigate = useNavigate()

  const login_fields = [
    {
      name: "Mail",
      type: "text",
      placeholder: "Type your mail here",
      stateValue: email,
      stateFunc: setEmail,
      adornment: <PersonIcon />
    },
    {
      name: "Password",
      type: "password",
      placeholder: "Type your password here",
      stateValue: password,
      stateFunc: setPassword,
      adornment: <EmailIcon />
    }
  ]

  function loginSuccessCallback(json) {
    cookies.setSessionCookie(json.token)
    navigate("/")
  }

  function loginFailureCallback(error) {
    snackbars.changeSnackbarSettings("error", error.status, setSnackbarSettings)
  }

  async function handleLoginClick() {
    if (email === "") {
      snackbars.changeSnackbarSettings("error", "Please fill in your email address.", setSnackbarSettings)
      return
    }
    if (!email.match(/[a-zA-Z0-9]+[@]+[a-zA-Z0-9]+[.]+[a-zA-Z]/g)) {
      snackbars.changeSnackbarSettings("error", "Invalid email address.", setSnackbarSettings)
      return
    }
    if (password === "") {
      snackbars.changeSnackbarSettings("error", "Please fill in your password.", setSnackbarSettings)
      return
    }
    await askServerToLogin(email, password, loginSuccessCallback, loginFailureCallback)
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
                color: "#fff"
              }}>Area - Login</Typography>
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
              {login_fields.map((elem) => {
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
                id="login-btn"
                onClick={handleLoginClick}
                sx={{
                  font: "Kayak",
                  fontSize: "20px",
                  color: "#fff",
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
                }}>Login</Button>
              <div
                style={{
                  display: "flex",
                  width: "60%",
                }}>
                <Link
                  href="/signup"
                  sx={{
                    color: "#fff",
                    marginLeft: "auto"
                  }}>Don't have an account yet ?</Link>
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