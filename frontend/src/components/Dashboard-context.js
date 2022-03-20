import React from "react";

const DashboardContext = React.createContext({
  dashboardRefresh: false,
  setDashboardRefreshh: () => {},

  cartCount: 0,
  setCartCount: () => {},
});

export default DashboardContext;
