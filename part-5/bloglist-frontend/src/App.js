import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Blog from "./components/Blog";
import Header from "./components/Header";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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
      username.reset();
      password.reset();
    } catch (exception) {
      toast.error("Wrong username or password");
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  //LOG OUT
  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser("");
    setPassword("");
    toast.success("Logout succeed!");
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

  return (
    <div>
      {user === null ? (
        <>
          <h2>log in to application</h2>
          {loginForm()}
        </>
      ) : (
        <Header user={user} logout={logout} />
      )}
    </div>
  );
};

export default App;
