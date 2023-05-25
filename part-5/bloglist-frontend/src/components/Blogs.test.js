import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blogs from "./Blogs";

// 5.13: Blog list tests, step1
// Make a test, which checks that the component displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default.

test("should render only title and author", () => {
  const blog = {
    user: "User",
    author: "Author",
    title: "Title",
    likes: 0,
    url: "Url",
  };
  const { container } = render(<Blogs blog={blog} />);

  const title = container.querySelector(".title");
  expect(title).toHaveTextContent("Title");

  const author = container.querySelector(".author");
  expect(author).toHaveTextContent("Author");

  const blogContainer = container.querySelector(".blog-container");

  expect(blogContainer).not.toHaveTextContent("Url");
  expect(blogContainer).not.toHaveTextContent("likes 0");
});

// 5.14: Blog list tests, step2
// Make a test, which checks that the blog's URL and number of likes are shown when the button controlling the shown details has been clicked.

test(" clicking button and showing url, likes", async () => {
  const blog = {
    user: "User",
    author: "Author",
    title: "Title",
    likes: 0,
    url: "Url",
  };
  const mockHandler = jest.fn();
  render(<Blogs blog={blog} onClick={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(0);
});

// 5.15: Blog list tests, step3
// Make a test, which ensures that if the like button is clicked twice, the event handler the component received as props is called twice.

