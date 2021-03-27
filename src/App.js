import Main from "./components/Main";
import Routes from "./components/Home";
import AcccessibleTable from "./components/MaterialCheck";
import Home from "./components/Home";

import "./styles.css";
import {
  Route,
  Switch,
  BrowserRouter,
  useHistory,
  Redirect,
} from "react-router-dom";
import Auth from "./auth/Auth";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/auth" component = {Auth} />
          <Route exact path="/items" component={AcccessibleTable}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
