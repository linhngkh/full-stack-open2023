describe("Blogs ", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "linh",
      username: "linhtinhtinh",
      password: "sekret",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", () => {
    cy.contains("Log in to application");
  });

  describe("when logged in", () => {
    beforeEach(() => {
      cy.contains("Login").click();
      cy.get("#username").type("linhtinhtinh");
      cy.get("#password").type("sekret");
      cy.get("#login-button").click();
    });

    it("name of the user is shown", () => {
      cy.contains("tinhtinhtinh logged in");
    });

    it("a new blog can be created", () => {
      cy.contains("new blog").click();
      cy.get("#title").type("Top of the World");
      cy.get("#author").type("Carpenters");
      cy.get("#url").type("N/A");
      cy.get("#likes").type("2");
      cy.get("#submit").click();
      cy.contains("Added a new blog");
    });
  });
});
