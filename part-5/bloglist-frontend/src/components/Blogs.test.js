import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blogs from "./Blogs";

test("should render only title and author", () => {
  const blog = {
    user: "User",
    likes: 0,
    author: "Author",
    title: "Title",
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
