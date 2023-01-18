import React from "react";
import "./style.css";
import AdminMenubar from "../../components/admin/AdminMenubar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminUser from "./AdminUser";
import ViewPosts from "../../components/admin/ViewPosts";

function ViewPostdetails() {
  return (
    <div>
      <div className="admin">
        <AdminMenubar />
        <div className="admin_wrapper">
          <div className="admin_sidebar_container">
            <AdminSidebar user />
          </div>
          <div className="admin_page_container ">
            <ViewPosts />
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default ViewPostdetails;
