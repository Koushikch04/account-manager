import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Account = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const formStyle = {
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    marginTop: "50px",
  };

  const buttonStyle = {
    marginTop: "15px",
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      navigate("/");
    } else {
      setEmail(loggedInUser.email);
      setPassword(loggedInUser.password);
    }
  }, [navigate]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === email ? { email, password } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("loggedInUser", JSON.stringify({ email, password }));
    alert("Account updated successfully");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div style={formStyle}>
            <h2>Account Information</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-success"
                style={buttonStyle}
              >
                Update
              </button>
            </form>
            <button onClick={handleLogout} className="btn btn-danger mt-3">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
