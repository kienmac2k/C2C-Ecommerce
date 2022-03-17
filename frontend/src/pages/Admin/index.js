import React from "react";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";

const Dashboard = React.lazy(() => import("./Dashboard"));
const Settings = React.lazy(() => import("./Settings"));
const Products = React.lazy(() => import("./Products"));
const NotFound = React.lazy(() => import("../../components/NotFound"));
const Orders = React.lazy(() => import("./Orders"));
const Shops = React.lazy(() => import("./Shops"));
const Users = React.lazy(() => import("./Users"));
const Categories = React.lazy(() => import("./Categories"));
const Upload = React.lazy(() => import("./Upload"));
const Seller = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <Redirect to={`${path}/dashboard`} />
      </Route>
      <Route exact path={`${path}/dashboard`} component={Dashboard} />
      <Route exact path={`${path}/settings`} component={Settings} />
      <Route exact path={`${path}/orders`} component={Orders} />
      <Route exact path={`${path}/categories`} component={Categories} />
      <Route exact path={`${path}/users`} component={Users} />
      <Route exact path={`${path}/shops`} component={Shops} />
      <Route exact path={`${path}/products`} component={Products} />
      <Route exact path={`${path}/upload`} component={Upload} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Seller;
