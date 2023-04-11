import React, { useContext, useState, useEffect } from "react";
import Routes from "./routes";
import "react-toastify/dist/ReactToastify.css";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { ptBR } from "@material-ui/core/locale";

import {
  CssBaseline,
  Switch,
  FormGroup,
  FormControlLabel,
  makeStyles
} from "@material-ui/core";
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import lightBackground from "../src/assets/wa-background-light.png";
import darkBackground from "../src/assets/wa-background-dark.jpg";

const useStyles = makeStyles(() => ({
  switch: {
    margin: "2px",
    position: "absolute",
    right: "0",
  },
  visible: {
    display: "none",
  },
}));

const App = () => {
  const [locale, setLocale] = useState();
  const [checked, setChecked] = React.useState(false);
  const classes = useStyles();

  const lightTheme = createTheme(
    {
      palette: {
        primary: { main: '#3c6afb' },
        secondary: { main: "#757575" },
        error: { main: '#ff0000' }, // cor dos icones
      },
      backgroundImage: `url(${lightBackground})`,
    },
    locale
  );

  const darkTheme = createTheme(
    {
      overrides: {
        MuiCssBaseline: {
          '@global': {
            body: {
              backgroundColor: "#1d2230",
            }
          }
        }
      },
      
      palette: {
        primary: { main: "#7d9bfa" },
        divider: "#464a5c",
        secondary: { main: "#eee" },
        error: { main: '#ff0000' }, // cor dos icones
        background: {
          default: "#1d2230",
          paper: "#2c3145",
        },
        text: {
          primary: "#eee",
          secondary: "#fff",
        },
      },
      backgroundImage: `url(${darkBackground})`,
    },
    locale
  );

  const [theme, setTheme] = useState("light");

  const themeToggle = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (checked === false) {
      themeToggle();
    } else if (checked === true) {
      themeToggle();
    }
  };

  useEffect(() => {
    const i18nlocale = localStorage.getItem("i18nextLng");
    const browserLocale = i18nlocale.substring(0, 2) + i18nlocale.substring(3, 5);

    if (browserLocale === "ptBR") {
      setLocale(ptBR);
    }
  }, []);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Routes />
      <CssBaseline />
      {/* desativado aqui */}
      <FormGroup row className={classes.switch}>
        <FormControlLabel control={
	<Switch
	checked={checked}
	onChange={handleChange}
	inputProps={{ 'aria-label': 'controlled'}} 
	/>}label="Dark Mode" />
</FormGroup>
    </ThemeProvider>
  );
};

export default App;
