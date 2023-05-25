import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

// 5.16: Blog list tests, step4
// Make a test for the new blog form. The test should check, that the form calls the event handler it received as props with the right details when a new blog is created.

test("<BlogForm/> call event handler and it received as props, when a new blog create", async () => {
  const addBlog = jest.fn();
  const setTitle = jest.fn();
  const setAuthor = jest.fn();
  const setUrl = jest.fn();
  const user = userEvent.setup();

  const component = render(
    <BlogForm
      addBlog={addBlog}
      setAuthor={setAuthor}
      setTitle={setTitle}
      setUrl={setUrl}
      title=""
      author=""
      url=""
    />
  );

  const form = component.container.querySelector("form");
  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");

  fireEvent.change(title, {
    target: { value: "Title" },
  });
  fireEvent.change(author, {
    target: { value: "Author" },
  });
  fireEvent.change(url, {
    target: { value: "Url" },
  });
  fireEvent.submit(form);

  expect(addBlog.mock.calls).toHaveLength(1);

  expect(setTitle.mock.calls[0][0]).toBe("Title");
  expect(setAuthor.mock.calls[0][0]).toBe("Author");
  expect(setUrl.mock.calls[0][0]).toBe("Url");
});
