import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Box from "@material-ui/core/Box";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Discover from "./pages/Discover";

import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="app">
        <Header></Header>
        <Box className="content">
          <Switch>
            <Route path="/discover">
              <Discover />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Box>
        <Footer></Footer>
      </div>
    </Router>
  );
}
