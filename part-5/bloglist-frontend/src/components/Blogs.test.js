import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blogs from "./Blogs";

describe("<Blogs/>", () => {
  let component;

  beforeEach(() => {
    const blog = {
      likes: 0,
      author: "Author",
      title: "Title",
      url: "Url",
    };
    component = render(<Blogs blog={blog} />);
  });
  test("should render only title and author", () => {
    const blogTitle = component.container.querySelector(".title");
    expect(blogTitle).toHaveTextContent("Title");

    const blogAuthor = component.container.querySelector(".author");
    expect(blogAuthor).toHaveTextContent("Author");

    const blogContainer = component.container.querySelector(".blogs-container");

    expect(blogContainer).not.toHaveTextContent("Url");
    expect(blogContainer).not.toHaveTextContent("Likes -");
  });

  test("should show url and likes after view button clicked", () => {
    const button = component.getByText("View");
    fireEvent.click(button);

    const blogContainer = component.container.querySelector(".blogs-container");

    expect(blogContainer).toHaveTextContent("Url");
    expect(blogContainer).toHaveTextContent("Likes -");
  });
});

test("should have 2 click event on like button", () => {
  const updateLike = jest.fn();
  const blog = {
    user: "User",
    likes: 0,
    author: "Author",
    title: "Title",
    url: "Url",
  };
  const component = render(<Blog updateLike={updateLike} blog={blog} />);

  const viewBtn = component.getByText("View");
  fireEvent.click(viewBtn);

  const likeBtn = component.getByText("Like");
  fireEvent.click(likeBtn);
  fireEvent.click(likeBtn);

  expect(updateLike.mock.calls).toHaveLength(2);
});
