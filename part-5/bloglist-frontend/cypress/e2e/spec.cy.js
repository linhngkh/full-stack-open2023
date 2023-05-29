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

    it("a blog can be created", () => {
      cy.contains("create").click();
      cy.get("#title").type("testing");
      cy.get("#author").type("Linh");
      cy.get("#url").type("http://linh.blog");
      cy.get("#likes").type("0");
      cy.get("#submit").click();
      cy.contains("Added a new blog");
    });

    describe("Action with a blog", function () {
      beforeEach(function () {
        cy.findByText("create").click();
        cy.get("#title").type("testing");
        cy.get("#author").type("Linh");
        cy.get("#url").type("http://linh.blog");
        cy.get("#likes").type("0");
        cy.get("#submit").click();
      });

      it(" users can like a blog", function () {
        cy.findByText("view").click();
        cy.get("#update-likes").click();
        cy.get("#update-likes").should("contain", "1");
      });

      describe("user who created a blog can delete it", function () {
        beforeEach(function () {
          const user = {
            name: "linh",
            username: "linhtinhtinh",
            password: "sekret",
          };
          cy.request("POST", "http://localhost:3003/bloglist/api/users", user);
          cy.visit("http://localhost:3000");
        });
        it("a blog can be deleted by the user who created it", function () {
          cy.findByText("view").click();
          cy.findByText("remove").click();
          cy.contains("testing");
        });
        it("a blog cannot be deleted by the user who did not create it", function () {
          cy.get("#logout").click();
          cy.get("#username").type("tesing");
          cy.get("#password").type("test123");
          cy.get("#submit").click();
          cy.findByText("view").click();
          cy.findByText("remove").click();
          cy.contains(" You are not authorized to delete this post");
        });
      });
    });
    it("bloglist is sorted", function () {
      cy.findByText("create").click();
      cy.get("#title").type("testing");
      cy.get("#url").type("http://linh.blog");
      cy.get("#author").type("linhtinhtinh");
      cy.get("#update-likes").click();
      cy.findByText("view").click();
      cy.get("#update-likes").click().wait(500).click().wait(500).click();
      cy.get("#").wait(500).should("contain", "3");
      cy.findByText("new blog").click();
      cy.get("#title").type("test");
      cy.get("#url").type("http://linh.blog");
      cy.get("#author").type("linhtinhtinh");
      cy.get("#update-likes").click().wait(500);

      cy.get(".blog-container")
        .eq(0)
        .should("contain", "The title with the most likes");
      cy.get(".blog-container")
        .eq(1)
        .should("contain", "The title with the second most likes");
    });
  });
});
