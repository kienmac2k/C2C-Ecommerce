import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Toolbar.scss";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import NavbarSearch from "../../../NavbarSearch";
import { isLoggedIn, tokenHelper } from "../../../../utils/helper";
import publicApi from "../../../../api/publicApi";
import { useSelector } from "react-redux";

const Toolbar = ({ location, handleDrawerToggleClick }) => {
  const isLogin = isLoggedIn();
  const [categories, setCategories] = React.useState([]);
  const productList = useSelector((state) => state.cart.cart);

  React.useEffect(() => {
    const fetchHeader = async () => {
      try {
        const response = await publicApi.getCategoriesByOrder(1);
        setCategories(response.categories);
      } catch (e) {
        console.log("Error in fetchHeader", e);
      }
    };
    fetchHeader();
  }, []);
  return (
    <header>
      <nav className="toolbar_navigation">
        <div className="toolbar_toggle_button">
          <DrawerToggleButton
            handleDrawerToggleClick={handleDrawerToggleClick}
          />
        </div>
        <div className="toolbar_logo">
          <Link to="/">
            <img
              src={require("../../../../assets/img/monkheylogo.png")}
              alt="logo"
            />
          </Link>
        </div>
        <div className="toolbar_navigation_items">
          <ul className="categories">
            <li>
              <NavLink to="/category/1">Categories</NavLink>
            </li>

            <li>
              <NavLink to="/livebids" activeClassName="activelinks">
                Live Bid
              </NavLink>
            </li>
            <li>
              <NavLink to="/homegoods" activeClassName="activelinks">
                Home Goods
              </NavLink>
            </li>
            <li>
              <NavLink to="/shops" activeClassName="activelinks">
                Shops
              </NavLink>
            </li>
            <li>
              <NavLink to="/wholesale" activeClassName="activelinks">
                Wholesale
              </NavLink>
            </li>

            <li>
              <NavLink to="/clearance" activeClassName="activelinks">
                Clearance
              </NavLink>
            </li>

            <li>
              <NavLink to="/superdeals" activeClassName="activelinks">
                Super Deals
              </NavLink>
            </li>
          </ul>

          <article>
            <NavbarSearch />
            <ul>
              {isLogin ? (
                <li>
                  <p>
                    <span className="hello">
                      <strong>Hello,kienneik</strong>
                    </span>{" "}
                    <Link to="/" onClick={() => tokenHelper.remove()}>
                      Logout
                    </Link>
                  </p>

                  <p>
                    <Link to="/dashboard">
                      <strong>Account</strong>
                    </Link>
                  </p>
                </li>
              ) : (
                <li>
                  <p>
                    <Link to="/login">Login</Link>
                  </p>

                  <p>
                    <Link to="/signup">
                      <strong>SignUp</strong>
                    </Link>
                  </p>
                </li>
              )}

              <li style={{ marginLeft: "5px" }}>
                <div className="cart">
                  <div className="cart_item">
                    <Link to="/productcart">
                      <img
                        src={require("../../../../assets/img/cart.png")}
                        alt="cart"
                      />
                      <span>{productList.length}</span>
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </article>
        </div>
      </nav>
      {location === "/" ? null : location === "/livebids" ? null : location ===
        "/wholesale" ? null : location === "/clearance" ? null : location ===
        "/superdeals" ? null : (
        <section className="productsnav">
          <ul className="productsnav__list">
            {categories.map((category, index) => (
              <li className="productsnav__list__item" key={index}>
                <NavLink
                  activeClassName="active"
                  to={`/category/${category.id}`}
                >
                  {category.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      )}
    </header>
  );
};

export default Toolbar;
