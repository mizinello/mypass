import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";


const Login = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: ""

  });
  


  const { email, password } = user;

  const onChange = e => setUser({
     ...user, [e.target.name]: e.target.value 
    });

  const onSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      login({ email, password });
    }
  };

  return (
    <div className="form-container">
      <h1 className="title">
        Welcome To MYPASS
      </h1>
      <div className="form-content-login">
      <h2>
        Login Page
      </h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            // placeholder={this.state.placeholder}
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Sign In"
          className="btn-sign-in"
        />
        <p>
        Don't Have an account ?
         <span> 
         <a className="text-signup" href={'/register'}> Sign Up Here.</a>
         </span>
      </p>
      </form>
      </div>
    </div>
  );
};

export default Login;
