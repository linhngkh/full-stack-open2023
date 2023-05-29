import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Blogs from "./components/Blogs";
import Header from "./components/Header";

import LoginForm from "./components/LoginForm";

import BlogForm from "./components/BlogForm";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

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
      toast.error(error.message);
    }
  };

  //LOG OUT
  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    window.location.reload();
  };

  // ADD BLOG
  const addBlog = (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      author,
      url,
      likes: 0,
    };
    try {
      blogService.create(newBlog).then((newBlog) => {
        setBlogs([...blogs, newBlog]);
      });

      toast.success(`Added a new blog: ${title} by ${author}`, 3000);
      setAuthor("");
      setTitle("");
      setUrl("");
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };

  // UPDATE BLOG
  const updateLikes = async (id, updateBlog) => {
    try {
      await blogService.update(id, updateBlog).then((returnedBlog) => {
        const updatedBlogs = blogs.map((blog) =>
          blog.id !== id ? blog : returnedBlog
        );
        const sortedBlog = updatedBlogs.sort((a, b) => b.likes - a.likes);

        setBlogs(sortedBlog);
      });
      toast.success("Successful updated like");
    } catch (error) {
      toast.error("Cant update Likes");
    }
  };

  // DELETE BLOG
  const deleteBlog = async (id) => {
    try {
      await blogService.deleteOne(id).then(() => {
        const removeBlog = blogs.filter((blog) => blog.id !== id);
        const sortedBlog = removeBlog.sort((a, b) => b.likes - a.likes);
        setBlogs(sortedBlog);
      });
      toast.success("Successful delete blog");
    } catch (error) {
      toast.error("Cant delete blog");
    }
  };

  return (
    <>
      <ToastContainer />
      <div>
        {user === null ? (
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
        ) : (
          <>
            <Header logout={logout} />
            <div className="p-2 w-1/3">
              <h1>blogs</h1>
              <p>{username} logged in</p>
            </div>
            <div className="mt-4 p-2">
              <BlogForm
                addBlog={addBlog}
                title={title}
                setTitle={setTitle}
                author={author}
                setAuthor={setAuthor}
                url={url}
                setUrl={setUrl}
              />
            </div>
            <div>
              {blogs.map((blog, index) => (
                <Blogs
                  blog={blog}
                  key={index}
                  updateLikes={updateLikes}
                  deleteBlog={deleteBlog}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;
