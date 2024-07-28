import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState(""); // State to store the selected role

  useEffect(() => {
    const container = document.getElementById("container1");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    const handleRegisterClick = () => {
      container.classList.add("active");
    };

    const handleLoginClick = () => {
      container.classList.remove("active");
    };

    registerBtn.addEventListener("click", handleRegisterClick);
    loginBtn.addEventListener("click", handleLoginClick);

    // Cleanup event listeners on component unmount
    return () => {
      registerBtn.removeEventListener("click", handleRegisterClick);
      loginBtn.removeEventListener("click", handleLoginClick);
    };
  }, []); // Empty dependency array ensures this effect runs once on mount

  const handleRoleChange = (e) => {
    setRole(e.target.value); // Update role state based on selected radio button
  };

  const navigate = useNavigate();

  const handleLogin = ()=>{
    if(role === "doctor"){
      navigate('/doctor/viewdata');
    }else if(role == "coordinator"){
      navigate('/coordinator/upload');
    }
  };


  return (
    <div className="divid">
      <div className="container1" id="container1">
        <div className="form-container sign-up">
          <form>
            <h1>Create Account</h1>
            <br />
            <div className="radio-container">
              <label>
                Doctor:
                <input
                  type="radio"
                  name="role"
                  value="doctor"
                  checked={role === "doctor"}
                  onChange={handleRoleChange}
                />
              </label>
              <label>
                Coordinator:
                <input
                  type="radio"
                  name="role"
                  value="coordinator"
                  checked={role === "coordinator"}
                  onChange={handleRoleChange}
                />
              </label>
            </div>
            <span>Register with E-mail</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Enter E-mail" />
            <input type="password" placeholder="Enter Password" />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        <div className="form-container sign-in">
          <form>
            <h1>Log in</h1>
            <br />
            <div className="radio-container">
              <label>
                Doctor:
                <input
                  type="radio"
                  name="role"
                  value="doctor"
                  checked={role === "doctor"}
                  onChange={handleRoleChange}
                />
              </label>
              <label>
                Coordinator:
                <input
                  type="radio"
                  name="role"
                  value="coordinator"
                  checked={role === "coordinator"}
                  onChange={handleRoleChange}
                />
              </label>
            </div>
            <span>Login With Email & Password</span>
            <input type="email" placeholder="Enter E-mail" />
            <input type="password" placeholder="Enter Password" />
            <a href="#">Forget Password?</a>

            <Link className="cr" to="/">
              <button className="" type="submit">
                Log in
              </button>
            </Link>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>
                Welcome To Rohini
                <br />
              </h1>
              <p>Log in With ID & Password</p>
              <button onClick={handleLogin} className="hidden" id="login">
                Log in
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Rohini</h1>
              <p>Don't have an account? Create an account</p>
              <button className="hidden" id="register">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
