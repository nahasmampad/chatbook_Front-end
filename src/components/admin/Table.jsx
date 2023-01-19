import axios from "axios";
import React, { useMemo } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTable } from "react-table";
import ViewPosts from "./ViewPosts";
import { Search, ArrowDown } from "../../svg";

function Table({ posts, viewDetails, getReportedPosts }) {
  const { user } = useSelector((state) => ({ ...state }));

  const postAction = async (post) => {
    const conformBox = window.confirm(
      `are you sure, you want to ${post.block ? "unblock" : "block"} this post?`
    );

    if (conformBox) {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/blockPost/${post._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      getReportedPosts();
    }
  };

  

  return (
    <div className="table_div_container">
      <div className="table_search">
        <input type="text" placeholder="Search" />
        <div>
          <Search />
        </div>
      </div>

      <div className="admin_table scrollbar">
        <table className="table_inner">
          <tr>
            <th>Sl No</th>
            <th>Post Owner</th>
            <th>Email</th>
            <th>Total Reports</th>
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
                    <td>{post.reportPosts.length}</td>
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
                        >
                          View
                        </button>
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

export default Table;
