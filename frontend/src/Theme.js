import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: {
      main: '#fdd534',
      textBlack: '#393627',
      textWhite: '#D6D8DA'
    },
    hover: {
      main: '#fbdb4b',
      textBlack: '#55513a'
    },
    title: "#9DA5B4",
    subtitle: "#8B949E",
    middleground: "#31363F",
    background: "#24292E",
  }
}

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;