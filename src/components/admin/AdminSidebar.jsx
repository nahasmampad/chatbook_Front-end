import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { Friends, Home, Market, Menu } from "../../svg";

function AdminSidebar({post,home,user}) {
  
  
    const color = '#1876F2'
  return (
    <div className="admin_sidebar">
      <Link to='/admin'>
      <div className={`admin_menu hover1 ${home ? 'active' :""}`} >
        <div className="admin_sidebar_icon">
          <Home  color={color}/>
        </div>
        <span>Home</span>
      </div>
      </Link>

      <Link to='/admin/users'>
      <div className={`admin_menu hover1 ${user ? 'active' :""}`} >
      <div className="admin_sidebar_icon">
          <Friends color={color}/>
        </div>
        <span>Users</span>
      </div>
      </Link>

      <Link to='/admin/posts'>
      <div className={`admin_menu hover1 ${post ? 'active' :""}`}>
      <div className="admin_sidebar_icon">
          <Market color={color}/>
        </div>
        <span>Posts</span>
      </div>
      </Link>
     
    </div>
  );
}

export default AdminSidebar;
