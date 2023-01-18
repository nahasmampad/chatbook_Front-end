import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import AdminMenubar from '../../components/admin/AdminMenubar'
import AdminSidebar from '../../components/admin/AdminSidebar'
import ViewPosts from '../../components/admin/ViewPosts'
import AdminReport from './AdminReport'


function ReportManagement() {
  const [postDetails, setPostDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const viewDetails = async (post) => {
    setPostDetails(post);
    setShowDetails(!showDetails);
    
  };
  const { user } = useSelector((state) => ({ ...state }));
  const [reports, setReports] = useState([]);
  const getReportedPosts = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getReportPosts`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    setReports(data);
  };

  useEffect(() => {
    getReportedPosts()
  }, [])
  return (
    <div className="admin">
      <AdminMenubar />
      <div className="admin_wrapper">
        <div className="admin_sidebar_container">
          <AdminSidebar report />
        </div>
        <div className="admin_page_container ">
          <AdminReport reports={reports} viewDetails={viewDetails} setShowDetails={setShowDetails} />
        </div>
      </div>
      {
        showDetails &&<div className="view_post_details_blur"></div>
      }
      {
        showDetails && <div className='view_post_details'>  
        <ViewPosts postDetails={postDetails} setShowDetails={setShowDetails}/>
        </div>
      }
      
      
    </div>
  )
}

export default ReportManagement