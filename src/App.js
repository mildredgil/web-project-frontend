import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Team from './components/Team';
import Login from './components/Login';
import Methodology from './components/Methodology';
import NotFoundPage from "./components/NotFoundPage";
import User from "./components/User";
import Regions from "./components/Regions";
import AdminPanel from "./components/Admin";

import { AppContext } from './contexts/AppContext';
import { RegionContextProvider } from './contexts/RegionContext';
import { HomeContextProvider } from './contexts/HomeContext';
import { MapContextProvider } from './contexts/MapContext';
import { MapMunicipioContextProvider } from './contexts/MapMunicipioContext';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Raleway', 
      '-apple-system',
      'BlinkMacSystemFont',
      "'Lato', sans-serif",
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    color: '#fff'
  }
});

const App = () => {
  const { rol,token } = React.useContext(AppContext);
  let loggedIn = token !== null;
  let isAdmin = rol !== null && rol == "0";

  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path='/'>
                <HomeContextProvider>
                    <MapContextProvider>
                      <MapMunicipioContextProvider>
                          <Home/>
                      </MapMunicipioContextProvider>
                    </MapContextProvider>
                </HomeContextProvider>
            </Route>
            <Route path='/regions'>      
              <RegionContextProvider>
                <Regions/>
              </RegionContextProvider>
            </Route>
            <Route path='/about-us' component={Team}/>
            <Route path='/methodology' component={Methodology}/>
            <Route path='/login'>
              {loggedIn ? 
                <React.Fragment>
                  {isAdmin ? <Redirect to="/adminPanel" /> :<Redirect from='/login' to="/perfil" />}
                </React.Fragment>
               : <Login/>}
            </Route>
            <Route path='/perfil'>
              {loggedIn ? <User/> : <Redirect to="/login" />}
            </Route>
            <Route path='/adminPanel'>
              {loggedIn ? 
                <React.Fragment>
                  {isAdmin ? <AdminPanel /> :<Redirect to="/perfil" />}
                </React.Fragment>
               : <Redirect to="/login" />}
            </Route>
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default App;