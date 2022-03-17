import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

const Dashboard = React.lazy(() => import("../../pages/Seller/Dashboard"));
const Products = React.lazy(() => import("../../pages/Seller/Products"));
const Shops = React.lazy(() => import("../../pages/Seller/Shops"));
const ShopDetail = React.lazy(() => import("./Shops/ShopDetail"));
const Orders = React.lazy(() => import("../../pages/Seller/Orders"));
const Settings = React.lazy(() => import("../../pages/Seller/Settings"));
const Withdrawals = React.lazy(() => import("../../pages/Seller/Withdrawals"));
const ProductUpload = React.lazy(() => import("../../pages/Seller/Upload"));
const NotFound = React.lazy(() => import("../../components/NotFound"));

const Seller = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`} component={Dashboard} />
      <Route exact path={`${path}/withdrawals`} component={Withdrawals} />
      <Route exact path={`${path}/shops`} component={Shops} />
      <Route exact path={`${path}/shops/:shopId`} component={ShopDetail} />
      <Route
        exact
        path={`${path}/shops/:shopId/products`}
        component={Products}
      />
      <Route exact path={`${path}/shops/:shopId/orders`} component={Orders} />
      <Route
        exact
        path={`${path}/shops/:shopId/settings`}
        component={Settings}
      />
      <Route
        exact
        path={`${path}/shops/:shopId/upload`}
        component={ProductUpload}
      />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Seller;
