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
import Button from "./components/utils/Button";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState("");
  const [loginVisible, setLoginVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    url: "",
  });

  const blogFormRef = useRef();
  const loginFormRef = useRef();

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
      username.reset();
      password.reset();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  // RENDER BLOGS
  const blog = () => {
    return (
      <div>
        {blogs.map((blog, index) => (
          <Blogs key={index} blog={blog} />
        ))}
      </div>
    );
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
        <div style={showWhenVisible} className="space-y-3">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <Button onClick={() => setLoginVisible(false)}>cancel</Button>
        </div>
      </div>
    );
  };

  //LOG OUT
  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    window.location.reload();
    setUser("");
    setPassword("");
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
      setNewBlog(blogs.concat(returnedBlog));
      toast.success(`Added a new blog: ${title} by ${author}`, 3000);
      setAuthor("");
      setTitle("");
      setUrl("");
    });
  };

  // RESET BLOG FORM
  const resetForm = () => {
    setFormData({ title: "", author: "", url: "" });
  };

  // BLOG FORM
  const blogForm = () => (
    <BlogForm
      handleSubmit={addBlog}
      resetForm={resetForm}
      title={title}
      author={author}
      url={url}
    />
  );

  return (
    <>
      <ToastContainer />
      <div>
        {user === null ? (
          <div className="flex mx-auto flex-col h-screen justify-center items-center ">
            <h2 className="text-xl p-4 font-bold">Log in to application</h2>
            {loginForm()}
          </div>
        ) : (
          <>
            <Header username={username} logout={logout} />
            {blog()}
            {blogForm()}
          </>
        )}
      </div>
    </>
  );
};

export default App;
