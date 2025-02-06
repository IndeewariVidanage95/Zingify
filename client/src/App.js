import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
//if we didn't use compilerOptions in jsconfig.json we have to write path like this ./scenes/homePage
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  //when logged in there is user and the token in the state so using useSelector grab the token, when token exist we are authorized so this is set the token to authorization to home and profile 
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
            <Routes>
              <Route path="/" element={<LoginPage/>}/>
              <Route 
                path="/home" 
                element={isAuth ? <HomePage/> : <Navigate to="/"/>}
              />
              <Route 
                path="/profile/:userId" 
                element={isAuth ? <ProfilePage/> : <Navigate to="/"/>}
              />
            </Routes>
        </ThemeProvider>  
      </BrowserRouter>
    </div>
  );
}

export default App;