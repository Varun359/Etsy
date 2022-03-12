import React from "react";
import { withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useCookies, CookiesProvider } from "react-cookie";
import { Navigate } from "react-router-dom";
const ShopCreate = () => {
  let redirectVar = null;
  const [cookie, setCookie] = useCookies(["cookie"]);
  if (!cookie.cookie) {
    redirectVar = <Navigate to="/login" />;
  }
  return (
    <div>
      {redirectVar}
      <Container>
        <form className="shop-form">
          <div className="shop-name">
            <h2>Name your shop</h2>
            <p>Choose a memorable name that reflects your style.</p>

            <div className="shop-name-input">
              <input
                required
                type="text"
                id="name"
                placeholder="Enter your shop name"
              />
            </div>
          </div>
          <br />
          <div className="shop-image-upload">
            <label htmlFor="shop-image">Add your shop's logo here</label>
            <p>After you open your shop, you still can change your logo.</p>

            <div className="image-preview"> </div>

            <input type="file" id="shop-image" />
          </div>
          <br />
          <button className="clicky" id="save-shop">
            Save and continue
          </button>
        </form>
      </Container>
    </div>
  );
};

export default ShopCreate;
