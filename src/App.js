import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import DetailsOfPokemon from "./components/DetailsOfPokemon";
import List from "./components/List";
import Search from "./components/Search";

export default function App() {
  return (
    <Router>
      <NavLink to='/'>pokemon</NavLink>
      <Switch>
        <Route exact path='/'>
          <List />
        </Route>
        <Route exact path={`/pokemon/:name`}>
          <DetailsOfPokemon></DetailsOfPokemon>
        </Route>
      </Switch>
    </Router>
  );
}