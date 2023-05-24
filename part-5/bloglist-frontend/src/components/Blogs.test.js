import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blogs from "./Blogs";

test("renders content", () => {
  const blog = {
    user: "User",
    likes: 0,
    author: "Author",
    title: "Title",
    url: "Url",
  };

  const { container } = render(<Blogs blog={blog} />);

  const authorElement = container.querySelector(".author");
  expect(authorElement).toHaveTextContent("Author");
});
