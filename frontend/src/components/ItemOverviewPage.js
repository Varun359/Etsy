import React from "react";
import "./css/itemOverviewPage.css";
function ItemOverviewPage() {
  return (
    <div>
      <section id="services" className="services section-bg">
        <div className="container-fluid">
          <div className="col-sm-12 text-center mb-4"></div>
          <div className="row row-sm">
            <div className="col-md-6 _boxzoom">
              <div className="_product-images">
                <div>
                  <img
                    className="my_img"
                    src={require("../images/item_image.avif")}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="_product-detail-content">
                <p className="_p-name"> Shop Name</p>
                <div className="_p-price-box">
                  <div className="p-list">
                    <span className="price"> 699 </span>
                  </div>
                  <div className="_p-add-cart">
                    <div className="_p-qty">
                      <span>Add Quantity</span>
                      <div
                        className="value-button decrease_"
                        id=""
                        value="Decrease Value"
                      >
                        -
                      </div>
                      <input type="number" name="qty" id="number" value="1" />
                      <div
                        className="value-button increase_"
                        id=""
                        value="Increase Value"
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <div className="_p-features">
                    <span> Description About this product:- </span>
                    Solid color polyester/linen full blackout thick sunscreen
                    floor curtain Type: General Pleat Applicable Window Type:
                    Flat Window Format: Rope Opening and Closing Method: Left
                    and Right Biparting Open Processing Accessories Cost:
                    Included Installation Type: Built-in Function: High
                    Shading(70%-90%) Material: Polyester / Cotton Style: Classic
                    Pattern: Embroidered Location: Window Technics: Woven Use:
                    Home, Hotel, Hospital, Cafe, Office Feature: Blackout,
                    Insulated, Flame Retardant Place of Origin: India Name:
                    Curtain Usage: Window Decoration Keywords: Ready Made
                    Blackout Curtain
                  </div>
                  <form action="" method="post" accept-charset="utf-8">
                    <ul className="spe_ul"></ul>
                    <div className="_p-qty-and-cart">
                      <div className="_p-add-cart">
                        {/* <button className="btn-theme btn buy-btn" tabindex="0">
                          <i className="fa fa-shopping-cart"></i> Buy Now
                        </button> */}
                        <button
                          className="btn-theme btn btn-success"
                          tabindex="0"
                        >
                          <i className="fa fa-shopping-cart"></i> Add to Cart
                        </button>
                        <input type="hidden" name="pid" value="18" />
                        <input type="hidden" name="price" value="850" />
                        <input type="hidden" name="url" value="" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ItemOverviewPage;
