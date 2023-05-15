import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

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

  const createBlog = (event) => {
    event.preventDefault();
    try {
      blogService
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
      setNotification(exception.response.data.error, 3000);
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

  const blogForm = () => (
    <Togglable buttonLabel="new blog">
      <BlogForm createBlog={createBlog} />
    </Togglable>
  );

  return (
    <div>
      <h1>log in to application </h1>
      {user === null ? loginForm() : <h2>blogs</h2> && blog()}
      
    </div>
  );
};

export default App;
