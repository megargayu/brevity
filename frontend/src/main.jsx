import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Box } from "@mui/material";

import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import "./index.css";
import Main from "./pages/Main";
import Navbar from "./components/Navbar";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

// https://github.com/mui/material-ui/issues/33424
const defaultProps = {
  defaultProps: {
    container: rootElement,
  },
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiPopover: defaultProps,
    MuiPopper: defaultProps,
    MuiDialog: defaultProps,
    MuiModal: defaultProps,
  },
});

root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={darkTheme}>
          <BrowserRouter>
            <Box className="w-full h-full bg-[#202020] flex flex-col">
              <Box className="flex flex-row grow">
                <Routes>
                  <Route path="/" element={<Main />} />
                </Routes>
              </Box>
            </Box>
          </BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
