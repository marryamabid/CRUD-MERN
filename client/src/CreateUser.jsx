import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  // submit function to handle form submission
  const submit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3000/createUser", {
        name,
        email,
        age,
      });
      console.log(result);
      navigate("/"); // redirect to home page after successful submission
    } catch (err) {
      console.log(err);
    }
  };
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="formupd vw-100 bg-white rounded p-3">
        <form onSubmit={submit}>
          <h2>Add User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              id="inpNameUser"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              id="inpEmailUser"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="text"
              placeholder="Enter Age"
              className="form-control"
              id="inpAgeUser"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="flexContainer">
            <button className="btnSubm btn btn-success" id="btnRecor">
              Submit
            </button>
            <button
              onClick={handleCancel}
              className="btn btn-success"
              id="btnCancelAdd"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
