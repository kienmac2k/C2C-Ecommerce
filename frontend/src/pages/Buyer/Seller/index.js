import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";

import SellerList from "./SellerList";
import SellerDetail from "./SellerDetail";

const Seller = () => {
  let { path } = useRouteMatch();

  return (
    <Router>
      <Switch>
        <Route path={path} component={SellerList} />
        <Route path={`${path}/:shopId`} component={SellerDetail} />
      </Switch>
    </Router>
  );
};

export default Seller;
