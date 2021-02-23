import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage"
import FavoritePage from "./pages/FavoritePage"

import './App.css';


function App() {
  const { isLoggedIn } = useSelector(state => state.user);

  return <Container className="application">
    {isLoggedIn ?
      <Redirect to="/" /> :
      <Redirect to="/login" />}
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/profile/:id" >
        <ProfilePage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/favorite">
        <FavoritePage />
      </Route>      
    </Switch>
  </Container>
}

export default App;
