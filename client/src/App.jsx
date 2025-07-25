import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import User from "./User";
import CreateUser from "./CreateUser";
import UpadateUser from "./UpdateUser";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/update/:id" element={<UpadateUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
