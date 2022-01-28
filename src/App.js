import "./App.css";
import Login from "./components/login/login";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import NotFound from "./components/NotFound/notFound";
import { useSelector, useDispatch } from "react-redux";
import HomeWrapper from "./components/homeWrapper/homeWrapper";
import GuardedRoute from "./routes/gaurded.route";
import { useEffect } from "react";
import { initialAuthInitalization } from "./store/loginsate-actions";

function App() {
  let dispatch = useDispatch();
  let userInfo = useSelector((state) => {
    return state.authState;
  });

  useEffect(() => {
    dispatch(initialAuthInitalization());
  }, [dispatch]);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/">
            <Redirect to="/login"></Redirect>
          </Route>
          <Route  component={Login} path="/login"/>
          <GuardedRoute
            path="/home"
            component={HomeWrapper}
            auth={!!userInfo.accessToken}
          />
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
