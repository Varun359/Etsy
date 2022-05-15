import React from "react";

const HomeContext = React.createContext({
  currencyObject: {},
  setCurrencyObject: () => {},

  regionObject: {},
  setRegionObject: () => {},
});

export default HomeContext;
