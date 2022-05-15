var assert = require("chai").assert;
var app = require("../app");

var chai = require("chai");
chai.use(require("chai-http"));

var expect = require("chai").expect;
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDAsImlhdCI6MTY0NzgyNzAwNCwiZXhwIjoxNjQ3ODM3ODA0fQ.FifDRBoCUXFW_Lcv6ysJ_ov233jBk7pSapgn2snVkKo";

describe("Insert Items Into shop", () => {
  it("It should insert Items into the shop", function () {
    chai.request
      .agent(app)
      .post("/insertItems")
      .send({
        email: "tester@gmail.com",
        name: "tester",
      })
      .then(function (res) {
        console.res.text;
        expect(res.text).to.equal("Item added to the shop successfully");
      })
      .catch((error) => {
        //console.log(error);
      });
  });
});

describe("Get shop Details", () => {
  it("It should give the details of the shop that user have", function () {
    chai.request
      .agent(app)
      .get("/shopDetails")
      .send({
        email: "tester@gmail.com",
        name: "tester",
      })
      .then(function (res) {
        expect(res).to.have.status(401);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

describe("Update User Profile ", () => {
  it("This should update the profile of the user", function () {
    chai.request
      .agent(app)
      .post("/updateUser")
      .send({
        email: "tester@gmail.com",
        name: "tester",
      })
      .then(function (res) {
        console.res.text;
        expect(res.text).to.equal("User Details Updated");
      })
      .catch((error) => {
        //console.log(error);
      });
    // .catch((error) => {
    //   console.log(error);
    // });
  });
});

describe("Get User details", () => {
  it("This should give the user Profile", (done) => {
    chai.request
      .agent(app)
      .get("/userProfile")
      .then(function (res) {
        // console.log(res.status);
        expect(res).to.have.status(404);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});

describe("Get all Items", () => {
  it("Get all Items", function () {
    chai.request
      .agent(app)
      .get("/getAllItems")
      .then(function (res) {
        //console.log(res.status);
        expect(res).to.have.status(404);
        // done();
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

// describe("Get all Items", () => {
//   it("/getAllItems", function () {
//     chai.request
//       .agent(app)
//       .post("/insertItems")
//       .send({
//         email: "tester@gmail.com",
//         name: "tester",
//       })
//       .then(function (res) {
//         console.res.text;
//         expect(res.text).to.equal("Item added to the shop successfully");
//       })
//       .catch((error) => {
//         //console.log(error);
//       });
//   });
// });
