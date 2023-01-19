import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import block from "../../svg/x-circle-fill.svg";

function AdminUser({ users, getAllUsers }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [search, setSearch] = useState("");
  const userAction = async (users) => {
    // alert(`are you sure, you want to ${users.block ? "unblock" : "block"} this user?`)
    const conformBox = window.confirm(
      `are you sure, you want to ${
        users.block ? "unblock" : "block"
      } this user?`
    );
    if (conformBox) {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/blockUser/${users._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      getAllUsers();
    }
  };
  const navigate = useNavigate()
    const viewDetails =(user)=>{
      navigate(`/adminProfile/${user.username}`)
    }
  return (
    <div className="admin_com_header">
      <div className="admin_user_management">
        User <span>Management</span>
      </div>
      <div className="table_search">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
       
      </div>
      <div className="admin_table scrollbar">
        <table className="table_inner">
          <tr>
            <th>Sl No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          {users.filter((val) => {
              if (search === "") {
                return val;
              } else if (
                  val.username.toLowerCase().includes(search.toLowerCase()) ||
                  val.email.toLowerCase().includes(search.toLowerCase())
              ){
                return val
              }
            }).map((user, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.block ? "Blocked" : "Active"}</td>
              <td>
                <div className="butten_view_table">
                  <button
                    onClick={() => userAction(user)}
                    className={
                      user.block ? "admin_unblock_btn" : "admin_block_btn"
                    }
                  >
                    {user.block ? "Unblock" : "Block"}
                  </button>

                  <button
                    onClick={() => viewDetails(user)}
                    className="blue_btn"
                  >
                    {" "}
                    View
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default AdminUser;
