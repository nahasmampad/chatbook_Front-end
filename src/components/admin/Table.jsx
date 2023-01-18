import React, { useMemo } from "react";
import { useState } from "react";
import { useTable } from "react-table";
import ViewPosts from "./ViewPosts";

function Table({ posts, viewDetails }) {
  
  const postAction = (post) => {
    
  };

 

  console.log(posts, "posts");

  return (
    <div className="table_div_container">
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
