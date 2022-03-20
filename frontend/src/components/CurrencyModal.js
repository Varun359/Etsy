import "./css/CurrencyModal.css";
import React, { useState } from "react";

function CurrencyModal({ setOpenModal }) {
    const [userPreferedCurrency, setUserPreferedCurrency] = useState("");

    const changePreferedCurrency = (userPreferedCurrency) => {
        window.location.reload(false);
        localStorage.setItem("preferedCurrency", userPreferedCurrency);
    };

    return (
        <div className="container">
            <div className=" currency_body my-5 body d-flex align-items-center">
                <h4 className="mt-1 font-weight-bold"> Currency </h4>
                <select
                    class="form-select custom-select ml-3"
                    aria-label="Default select example"
                    onChange={(e) => {
                        setUserPreferedCurrency(e.target.value);
                    }}
                >
                    <option selected> - select currency - </option>
                    <option value="$"> $ USD </option>
                    <option value="₹"> ₹ Rupee</option>
                    <option value="£"> £ Pound</option>
                </select>
            </div>
        </div>
    );
}

export default CurrencyModal;
