import { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Blogs from "./components/Blogs";
import Header from "./components/Header";

import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import CreateBlog from "./components/CreateBlog";
const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate();
  const loginFormRef = useRef();
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
      navigate("/");
      toast.success("Succeeded login!");
      setUser("");
      setPassword("");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  //LOG OUT
  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    window.location.reload();
  };

  // ADD BLOG
  const addBlog = async (title, author, url) => {
    blogFormRef.current.toggleVisibility();
    const blogObject = {
      title,
      author,
      url,
      likes: 0,
    };
    try {
      const blog = await blogService.create(blogObject);
      setBlogs(blogs.concat(blog));

      toast.success(`Added a new blog: ${title} by ${author}`, 3000);
      setAuthor("");
      setTitle("");
      setUrl("");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div>
        {user === null ? (
          <Togglable buttonLabel="login" ref={loginFormRef}>
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleLogin={handleLogin}
            />
          </Togglable>
        ) : (
          <>
            <Header username={username} logout={logout} />
            <div className="mt-4 p-2">
              <Togglable buttonLabel="New blog" ref={blogFormRef}>
                <CreateBlog handleAddBlog={addBlog} />
              </Togglable>
            </div>
            <div>
              {blogs.map((blog, index) => (
                <Blogs blog={blog} key={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;
