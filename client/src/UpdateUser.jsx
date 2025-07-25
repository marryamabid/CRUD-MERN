import { useState, useEffect, React } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
  const { id } = useParams(); // this is how we capture the ID from the URL
  // hooks to update the fields, just like in the CreateUser.jsx file
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  //Here, in useEffect, we will fill in the fields of the updateUser form
  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await axios.get(`http://localhost:3000/getUser/${id}`);
        if (user.data) {
          setName(user.data.name);
          setEmail(user.data.email);
          setAge(user.data.age);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [id]);

  // We will create function of update for onSubmit
  // this function will be called when the form is submitted
  // it will send a post request to the server with the updated data
  const Update = (e) => {
    e.preventDefault();
    async function updateUser() {
      try {
        const updateUser = await axios.post(
          `http://localhost:3000/updateUser/${id}`,
          { name, email, age }
        );
        console.log(updateUser);
        navigate("/"); // redirect to home page after successful update
      } catch (error) {
        console.log(error);
      }
    }
    updateUser();
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="formupd vw-100  bg-white rounded p-3">
        <form onSubmit={Update}>
          <h2>Update User</h2>
          <div className="mb-2">
            <label htmlFor="input-name-update">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              id="input-name-update"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="input-email-update">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              id="input-email-update"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="input-Age-Update">Age</label>
            <input
              type="text"
              placeholder="Enter Age"
              className="form-control"
              id="input-Age-Update"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="flexContainer">
            <button type="submit" className="btn btn-success btnSubmUpd">
              Update
            </button>
            <button
              onClick={handleCancel}
              className="btn btn-success"
              id="btnCancelUpd"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
