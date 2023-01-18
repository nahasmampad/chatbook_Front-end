import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../components/admin/Table";

export default function AdminReport({reports, viewDetails,setShowDetails}) {
   
  
  return (
    <div className="Report_Admin">
      <div className="admin_user_management">
        Report <span>Management</span>
      </div>
      <Table posts={reports} viewDetails={viewDetails} />
    </div>
  );
}
