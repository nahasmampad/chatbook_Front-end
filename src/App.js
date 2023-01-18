import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/profile";
import SavedPost from "./pages/SavedPosts/savedPost";
import Home from "./pages/home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import AdminRoute from "./routes/AdminRout";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import { useSelector } from "react-redux";
import Activate from "./pages/home/activate";
import Reset from "./pages/reset";
import CreatePostPopup from "./components/createPostPopup";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { postsReducer } from "./functions/reducers";
import Friends from "./pages/friends";
import Messanger from "./pages/messanger/Messanger";
import Admin from "./pages/admin";
import AdminUser from "./pages/admin/UserManagement";
import AdminPost from "./pages/admin/PostManagement";
import ErrorPage from "./pages/eroor/ErrorPage";
import AdminReport from "./pages/admin/AdminReport";
import ReportManagement from "./pages/admin/ReportManagement";
import ViewPostdetails from "./pages/admin/ViewPostdetails";
function App() {
  const [visible, setVisible] = useState(false);
  const { user, darkTheme } = useSelector((state) => ({ ...state }));
  const [{ loading, error, posts }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: "",
  });
  useEffect(() => {
    getAllPosts();
  }, []);
  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllposts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error.response.data.message,
      });
    }
  };
  return (
    <div className="appMain">
      {visible && (
        <CreatePostPopup
          user={user}
          setVisible={setVisible}
          posts={posts}
          dispatch={dispatch}
        />
      )}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route
            path="/profile"
            element={
              <Profile setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />

          <Route
            path="/profile/:username"
            element={
              <Profile setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />

          <Route
            path="/friends"
            element={
              <Friends setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />
          <Route
            path="/friends/:type"
            element={
              <Friends setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />

          <Route
            path="/savedpost"
            element={
              <SavedPost setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />

          <Route
            path="/messanger"
            element={
              <Messanger setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />

          <Route
            path="/"
            element={
              <Home
                setVisible={setVisible}
                posts={posts}
                loading={loading}
                getAllPosts={getAllPosts}
              />
            }
            exact
          />
          <Route path="/activate/:token" element={<Activate />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<Admin />} exact />
          <Route path="/admin/users" element={<AdminUser />} />
          <Route path="/admin/posts" element={<AdminPost />} />
          <Route path="/admin/reports" element={<ReportManagement />} />
          <Route path="/admin/viewPosts" element={<ViewPostdetails />} />
        </Route>

        <Route path="/reset" element={<Reset />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
