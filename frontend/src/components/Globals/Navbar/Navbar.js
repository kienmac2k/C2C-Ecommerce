import React, { Component } from "react";
import Toolbar from "./Toolbar/Toolbar";
import SideDrawer from "./SideDrawer/SideDrawer";
import Backdrop from "./Backdrop/Backdrop";
import { withRouter } from "react-router-dom";

class Navbar extends Component {
  state = {
    SideDrawerOpen: false,
  };
  handleDrawerToggleClick = () => {
    this.setState((prevState) => {
      return {
        SideDrawerOpen: !prevState.SideDrawerOpen,
      };
    });
  };
  handleBackdropClick = () => {
    this.setState({
      SideDrawerOpen: false,
    });
  };

  render() {
    const location = this.props.history.location.pathname;

    let myBackdrop;
    if (this.state.SideDrawerOpen) {
      myBackdrop = <Backdrop handleBackdropClick={this.handleBackdropClick} />;
    }
    return (
      <div style={{ height: "100%" }}>
        <Toolbar
          handleDrawerToggleClick={this.handleDrawerToggleClick}
          location={location}
        />
        <SideDrawer show={this.state.SideDrawerOpen} />
        {myBackdrop}
      </div>
    );
  }
}

export default withRouter(Navbar);
