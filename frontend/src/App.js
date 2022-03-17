import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

import Spinner from "./components/Globals/Spinner/Spinner";
import Navbar from "./components/Globals/Navbar/Navbar";
import Footer from "./components/Globals/Footer/Footer";
import BacktoTopButton from "./components/BacktoTop";

const Login = React.lazy(() => import("./pages/Common/Login"));
const Signup = React.lazy(() => import("./pages/Common/Signup"));
const Home = React.lazy(() => import("./pages/Buyer/Home"));
const SearchPage = React.lazy(() => import("./pages/Buyer/SearchPage"));
const MainCategory = React.lazy(() => import("./pages/Buyer/MainCategory"));
const SubCategory = React.lazy(() =>
  import("./pages/Buyer/MainCategory/SubCategory")
);
const NotFound = React.lazy(() => import("./components/NotFound"));
const ProductCart = React.lazy(() => import("./pages/Buyer/ProductCart"));

const HomeGoods = React.lazy(() => import("./pages/homegoods"));

//KITCHEN
const KitchenEquipments = React.lazy(() => import("./pages/kitchen"));
const KitchenCategories = React.lazy(() =>
  import("./components/Kitchen/Categories")
);
const KitchenProductDetails = React.lazy(() =>
  import("./components/Kitchen/ProductDetails")
);

const BedroomEquipments = React.lazy(() => import("./pages/bedroom"));
const BedroomProductDetail = React.lazy(() =>
  import("./components/Bedroom/ProductDetails")
);
const BathroomEquipments = React.lazy(() => import("./pages/bathroom"));
const BathroomProductDetail = React.lazy(() =>
  import("./components/Bathroom/ProductDetails")
);
const DinningRoomEquipemts = React.lazy(() => import("./pages/diningroom"));
const DinningProductDetail = React.lazy(() =>
  import("./components/Dinningroom/ProductDetails")
);
const LivingRoomEquipemts = React.lazy(() => import("./pages/livingroom"));
const LivingRoomProductDetail = React.lazy(() =>
  import("./components/Livingroom/ProductDetails")
);
const Wholesale = React.lazy(() => import("./pages/Buyer/Sale/wholesale"));
const SuperDeals = React.lazy(() => import("./pages/Buyer/Sale/superdeals"));
const Clearance = React.lazy(() => import("./pages/Buyer/Clearance"));
const Livebids = React.lazy(() => import("./pages/livebids"));
const Bid = React.lazy(() => import("./components/Livebid/BidBuy"));

const ProductDetails = React.lazy(() => import("./pages/Buyer/ProductDetail"));

//other
const Shipping = React.lazy(() => import("./pages/Buyer/Shipping"));
const Payment = React.lazy(() => import("./pages/Buyer/Payment"));
//Seller view from buyer
const Seller = React.lazy(() => import("./pages/Buyer/Seller"));
const SellerDetail = React.lazy(() =>
  import("./pages/Buyer/Seller/SellerDetail")
);
const SellerHome = React.lazy(() => import("./pages/Seller"));
const AdminHome = React.lazy(() => import("./pages/Admin"));

function App() {
  return (
    <Router>
      <Navbar />
      <BacktoTopButton />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/category/:categoryId" component={MainCategory} />
          <Route
            exact
            path="/category/:parentCategoryId/:subCategoryId"
            component={SubCategory}
          />

          <Route exact path="/product/:id" component={ProductDetails} />

          <Route exact path="/wholesale" component={Wholesale} />
          <Route exact path="/superdeals" component={SuperDeals} />
          <Route exact path="/clearance" component={Clearance} />
          <Route exact path="/livebids" component={Livebids} />
          <Route exact path="/bid/:category" component={Bid} />

          {/* Home good category */}
          <Route exact path="/homegoods" component={HomeGoods} />

          {/* Kitchen */}
          <Route
            exact
            path="/homegoods/kitchen-equipments"
            component={KitchenEquipments}
          />
          <Route
            exact
            path="/homegoods/kitchen-equipments/:category"
            component={KitchenCategories}
          />
          <Route
            exact
            path="/homegoods/kitchen-equipments/product/:id"
            component={KitchenProductDetails}
          />
          {/* Bedroom */}

          <Route
            exact
            path="/homegoods/bedroom-equipments"
            component={BedroomEquipments}
          />
          <Route
            exact
            path="/homegoods/bedroom-equipments/product/:id"
            component={BedroomProductDetail}
          />
          {/* Bathroom */}

          <Route
            exact
            path="/homegoods/bathroom-equipments"
            component={BathroomEquipments}
          />
          <Route
            exact
            path="/homegoods/bathroom-equipments/product/:id"
            component={BathroomProductDetail}
          />
          {/* Dining Room */}
          <Route
            exact
            path="/homegoods/dinningroom-equipments"
            component={DinningRoomEquipemts}
          />
          <Route
            exact
            path="/homegoods/dinningroom-equipments/product/:id"
            component={DinningProductDetail}
          />
          {/* Living Room */}
          <Route
            exact
            path="/homegoods/livingroom-equipments"
            component={LivingRoomEquipemts}
          />
          <Route
            exact
            path="/homegoods/livingroom-equipments/product/:id"
            component={LivingRoomProductDetail}
          />

          <Route exact path="/shops" component={Seller}></Route>
          <Route exact path="/shops/:id" component={SellerDetail}></Route>

          <Route exact path="/productcart" component={ProductCart} />
          <Route exact path="/shipping" component={Shipping} />
          <Route exact path="/payment" component={Payment} />

          {/* Seller route  */}
          <Route path="/seller" component={SellerHome} />

          {/* Super admin route */}
          <Route path="/admin" component={AdminHome} />

          <Route path="/*" component={NotFound} />
        </Switch>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
