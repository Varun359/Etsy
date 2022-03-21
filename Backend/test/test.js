var assert = require("chai").assert;
var app = require("../app");

var chai = require("chai");
chai.use(require("chai-http"));

var expect = require("chai").expect;
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDAsImlhdCI6MTY0NzgyNzAwNCwiZXhwIjoxNjQ3ODM3ODA0fQ.FifDRBoCUXFW_Lcv6ysJ_ov233jBk7pSapgn2snVkKo";
//var agent = require("chai").request.agent(app);

describe("Signin Test", () => {
  it("/login", (done) => {
    chai.request
      .agent(app)
      .post("/login")
      .send({ email: "varun@gmail.com", password: "password" })
      .then(function (res) {
        console.log(res.status);
        expect(res).to.have.status(200);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});

describe("Register Test", () => {
  it("/register", (done) => {
    chai.request
      .agent(app)
      .post("/register")
      .send({
        email: "dhoni@gmail.com",
        password: "donttell",
        firstName: "dhoni",
      })
      .then(function (res) {
        console.log(res.status);
        expect(res).to.have.status(200);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});

describe("Get User details", () => {
  it("/profile", (done) => {
    chai.request
      .agent(app)
      .post("/profile")
      .then(function (res) {
        console.log(res.status);
        expect(res).to.have.status(404);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});

describe("Get all Items", () => {
  it("/allItems", function () {
    chai.request
      .agent(app)
      .get("/allItems")
      .then(function (res) {
        expect(res).to.have.status(200);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

describe("Update Profile", () => {
  it("/updateProfile", function () {
    chai.request
      .agent(app)
      .post("/updateProfile")
      .send({
        email: "vikas1@gmail.com",
        name: "vikas1",
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
