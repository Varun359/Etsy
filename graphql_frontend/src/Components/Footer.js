import React, { useState, useEffect, useContext } from "react";
import "./css/home.css";
import Register from "./Register";
import { Navigate } from "react-router-dom";
import { Cancel } from "@material-ui/icons";
import axios from "axios";
import HomeContext from "./Home-Context";
import Select from "react-select";
function Footer() {
  const [showRegister, setshowRegister] = useState(false);
  const { currencyObject, setCurrencyObject, regionObject, setRegionObject } =
    useContext(HomeContext);
  const options = [
    {
      value: "$ United States Dollar (USD)",
      label: "$ United States Dollar (USD)",
      Currency_code: "(USD)",
      Symbol: "$",
    },
    {
      value: "$ Canadian Dollar (CAD)",
      label: "$ Canadian Dollar (CAD)",
      Currency_code: "CAD",
      Symbol: "$",
    },
    {
      value: "€ Euro (EUR)",
      label: "€ Euro (EUR)",
      Currency_code: "EUR",
      Symbol: "€",
    },
    {
      value: "£ British Pound (GBP)",
      label: "£ British Pound (GBP)",
      Currency_code: "GBP",
      Symbol: "£",
    },
    {
      value: "$ Australia Dollar (AUD)",
      label: "$ Australia Dollar (AUD)",
      Currency_code: "AUD",
      Symbol: "$",
    },
    {
      value: "¥ Japanese Yen (JPY)",
      label: "¥ Japanese Yen (JPY)",
      Currency_code: "JPY",
      Symbol: "¥",
    },
    {
      value: "¥ Chinese Yuan (CNY)",
      label: "¥ Japanese Yuan (CNY)",
      Currency_code: "CNY",
      Symbol: "¥",
    },
    {
      value: "kr Danish Krone (DKK)",
      label: "kr Danish Krone (DKK)",
      Currency_code: "DKK",
      Symbol: "kr",
    },
    {
      value: "Kč Czech Koruna (CZK)",
      label: "Kč Czech Koruna (CZK)",
      Currency_code: "CZK",
      Symbol: "Kč",
    },
    {
      value: "$ Hong Kong Dollar (HKD)",
      label: "$ Hong Kong Dollar (HKD)",
      Currency_code: "HKD",
      Symbol: "$",
    },
    {
      value: "Ft Hungarian Forint (HUF)",
      label: "Ft Hungarian Forint (HUF)",
      Currency_code: "HUF",
      Symbol: "Ft",
    },
    {
      value: "₹ Indian Rupee (INR)",
      label: "₹ Indian Rupee (INR)",
      Currency_code: "INR",
      Symbol: "₹",
    },
    {
      value: "Rp Indonesian Rupiah (IDR)",
      label: "Rp Indonesian Rupiah (IDR)",
      Currency_code: "IDR",
      Symbol: "Rp",
    },
    {
      value: "₹ Indian Rupee (INR)",
      label: "₹ Indian Rupee (INR)",
      Currency_code: "INR",
      Symbol: "₹",
    },
  ];

  const [show, setShow] = useState(false);

  const closeModal = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectValue, setSelectValue] = useState("");

  const handleChange = (selectValue) => {
    setSelectValue(selectValue);
    setCurrencyObject(selectValue);
  };
  const handleSave = () => {
    console.log("selectValue", selectValue);
  };
  return (
    <>
      <hr></hr>
      <footer className="home_footer">
        <div>
          <button variant="btn btn-primary" onClick={handleShow}>
            Currency
          </button>
          {show && (
            <div
              class="modal"
              id="signInModel"
              role="dialog"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <form
                  onSubmit={(e) => {
                    handleSave(e);
                  }}
                >
                  <div class="modal-content">
                    <div class="modal-header">
                      <div
                        style={{
                          diaplay: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <h5 class="modal-title" id="exampleModalLabel">
                            Update Your Settings
                          </h5>
                        </div>
                      </div>
                      <button
                        type="button"
                        class="close"
                        onClick={closeModal}
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div class="form-group">
                        <Select
                          options={options}
                          value={selectValue}
                          onChange={handleChange}
                        />
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                        <button type="submit" class="btn btn-primary">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </footer>
    </>
  );
}

export default Footer;
