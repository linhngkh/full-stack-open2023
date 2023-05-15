import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const [notification, setNotification] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

  const blogFormRef = useRef();

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

  const handleLogin = async (event) => {
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
        setNotification={setNotification}
      />
    ));
  };

  // LOGIN FORM
  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  // ADD BLOG

  const addBlog = (e) => {
    e.preventDefault();
    blogFormRef.current.toggleVisibility();
    const blogObject = {
      title,
      author,
      url,
      likes: 0,
    };
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setAuthor("");
      setTitle("");
      setUrl("");
      setNotification(`a new blog ${title} by ${author} added`, 5000);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    });
  };

  // BLOG FORM
  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        setNotification={setNotification}
        setTitle={setTitle}
        setUrl={setUrl}
        setAuthor={setAuthor}
        setErrorMessage={setErrorMessage}
        addBlog={addBlog}
      />
    </Togglable>
  );

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ? loginForm() : blog() }
    </div>
  );
};

export default App;
