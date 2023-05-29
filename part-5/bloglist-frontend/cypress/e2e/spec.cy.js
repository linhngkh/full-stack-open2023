describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    // create here a user to backend
    const user = {
      username: "root",
      password: "sekret",
    };
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Log in to application, username, password, Login");
  });
});
