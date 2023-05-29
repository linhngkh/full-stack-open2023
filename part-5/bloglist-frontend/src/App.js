import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import { useNavigate } from "react-router-dom";

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
        window.localStorage.setItem("user", JSON.stringify(user));
      }

      blogService.setToken(user.token);
      setUser(user);

      toast.success("Succeeded login!");
      setUser("");
      setPassword("");
    } catch (error) {
      toast.error(error.message);
    }
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
  const updateLike = (id, blogObject) => {
    blogService.update(id, blogObject).then((returnedBlog) => {
      const updateBlogs = blogs.map((blog) =>
        blog.id !== id ? blog : returnedBlog
      );
      const sortBlogs = updateBlogs.sort((b1, b2) => b1.likes - b2.likes);
      console.log(sortBlogs);
      setBlogs(sortBlogs);
    });
  };

  // DELETE BLOG
  const deleteBlog = (id) => {
    try {
      blogService.remove(id).then(() => {
        const filterBlogs = blogs.filter((blog) => blog.id !== id);
        const sortBlogs = filterBlogs.sort((b1, b2) => b1.likes - b2.likes);
        setBlogs(sortBlogs);
      });
      toast.success("ok");
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
            <button
              className="bg-slate-500 text-white px-5 py-2"
              onClick={() => {
                window.localStorage.removeItem("user");
                setUser(null);
                navigate("/");
              }}
            >
              Log out
            </button>
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
                  updateLike={updateLike}
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
