import React from "react";

const DashboardContext = React.createContext({
  dashboardRefresh: false,
  setDashboardRefreshh: () => {},
});

export default DashboardContext;
