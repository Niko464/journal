import { createRoot } from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import MainPage from './routes/main'
import Signup from './routes/signup'
import Login from './routes/login'
import TopicsPage from "./routes/topics"
import HistoryPage from "./routes/history"
import { createTheme, ThemeProvider } from '@mui/material/styles'
import "index.css"

const theme = createTheme({
  palette: {
    mode: "dark",
    type: "dark",
    primary: {
      main: '#F4CE54', //#F4CE54  #3f51b5
      mainTextColor: "#fff",
      subTextColor: "gray",
    },
    secondary: {
      main: '#f50057', //#f50057
    },
    foreground: "#373737",
    middleground: "#31363F",
    background: "#24292E",
    error: {
      main: "#ed0e36",
      second: "#a1001d",
    },
    success: {
      main: "#28a745" //#26803D
    }
  },
});

document.body.style = "background: " + theme.palette.background

const root = createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="topics" element={<TopicsPage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);