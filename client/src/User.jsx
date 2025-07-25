import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function User() {
  const [users, setUsers] = React.useState([]);
  const fetchUsers = async () => {
    try {
      const user = await axios.get("http://localhost:3000/");
      setUsers(user.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  async function handleDelete(id) {
    const deleteUser = await axios.delete(
      `http://localhost:3000/deleteUser/${id}`
    );
    console.log(deleteUser);
    fetchUsers();
  }
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="tab vw-50 w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-primary mb-3">
          Create User
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td className="d-flex gap-2">
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-success"
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDelete(user._id);
                      }}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default User;
