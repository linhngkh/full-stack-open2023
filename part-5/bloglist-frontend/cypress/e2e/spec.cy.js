describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3000");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Login").click();
  });
});
