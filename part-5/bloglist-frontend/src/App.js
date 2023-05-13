import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [addBlogs, setAddBlogs] = useState("");
  const [notification, setNotification] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      if (user) {
        window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      }

      blogService.setToken(user.token);
      setUser(user);
      username.reset();
      password.reset();
      setNotification("Successfully logged in", 5000);
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const createBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService
        .create({
          title,
          author,
          url,
        })
        .then((data) => {
          addBlogs(data);
          setNotification(`a new blog ${title} by ${author} added`, 5000);
        });
    } catch (exception) {
      setErrorMessage("Cant add a blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const blog = () => {
    blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        setUser={setUser}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
        createBlog={createBlog}
        setNotification
      />
    ));
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm username={username} password={password} />
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1>log in to application </h1>
      {user === null ? (
        <LoginForm handleSubmit={handleSubmit} />
      ) : (
        <h2>blogs</h2> && blog()
      )}
    </div>
  );
};

export default App;
