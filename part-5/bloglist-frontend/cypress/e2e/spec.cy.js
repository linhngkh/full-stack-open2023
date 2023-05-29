describe("Blogs app", function () {
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

  it("Login form is shown", function () {
    cy.contains("Log in to application");
  });

  it.only("login fails with wrong password", function () {
    cy.contains("Login").click();
    cy.get("#username").type("linhtinhtinh");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.contains("Request failed with status code 401");
  });

  describe("when logged in", function () {
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
      cy.contains("create").click();
      cy.get("#title").type("testing");
      cy.get("#author").type("Linh");
      cy.get("#url").type("http://linh.blog");
      cy.get("#likes").type("0");
      cy.get("#submit").click();
      cy.contains("Added a new blog");
    });
  });
});
