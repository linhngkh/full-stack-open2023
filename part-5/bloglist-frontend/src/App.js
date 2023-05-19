import { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import blogService from "./services/blogs";
import loginService from "./services/login";
import Blog from "./components/Blog";
import Header from "./components/Header";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Tooglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [loginVisible, setLoginVisible] = useState(false);
  const navigate = useNavigate();

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

  // HANDLE LOGIN
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging with", username, password);
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
      toast.success("Succeeded login!");
      username.reset();
      password.reset();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const blog = () => {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map((blog, index) => (
          <Blog key={index} blog={blog} />
        ))}
      </div>
    );
  };

  // LOGIN FORM

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    );
  };

  //LOG OUT
  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    window.location.reload();
    setUser("");
    setPassword("");
    navigate("/");
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
      toast.success(`Added a new blog: ${title} by ${author}`, 3000);
      setAuthor("");
      setTitle("");
      setUrl("");
    });
  };

  // BLOG FORM
  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm handleSubmit={addBlog} />
    </Togglable>
  );
  return (
    <>
      <ToastContainer />
      <div>
        {user === null ? (
          <>
            <h2>log in to application</h2>
            {loginForm()}
          </>
        ) : (
          <Header username={username} logout={logout} />
        )}
      </div>
    </>
  );
};

export default App;
