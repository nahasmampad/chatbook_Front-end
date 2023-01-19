import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";


function AdminPostMgent({ posts, getAllUserPosts,viewDetails }) {
  const { user } = useSelector((state) => ({ ...state }));
  const postAction = async (post) => {
    const conformBox = window.confirm(
      `are you sure, you want to ${
        post.block ? "unblock" : "block"
      } this user?`
    );

    if(conformBox){
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/blockPost/${post._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      getAllUserPosts();
    }
    
  };
  return (
    <div className="admin_com_header">
      <div className="admin_user_management">
        Post <span>Management</span>
      </div>
      <div className="admin_table scrollbar">
        <table className="table_inner">
          <tr>
            <th>Sl No</th>
            <th>Post Owner</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          {posts.length > 0 &&
            posts.map((post, i) => {
              return (
                <>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{post.user.username}</td>
                    <td>{post.user.email}</td>
                    <td>{post.block ? "Blocked" : "Active"}</td>
                    <td>
                      <div className="butten_view_table">
                      <button
                        onClick={() => postAction(post)}
                        className={
                          post.block ? "admin_unblock_btn" : "admin_block_btn"
                        }
                      >
                        {post.block ? "Unblock" : "Block"}
                      </button>
                      <button
                          onClick={() => viewDetails(post)}
                          className="blue_btn"
                        >View</button>
                      </div>
                      
                    </td>
                  </tr>
                </>
              );
            })}
        </table>
      </div>
    </div>
  );
}

export default AdminPostMgent;
