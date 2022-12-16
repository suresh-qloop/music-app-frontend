import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModeContext } from "../context/ModeContext";
import { Music_App_API_URL } from "../utils/globalVariables";

const SignIn = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { setIsLogin, setAuthor } = useContext(ModeContext);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    await axios
      .post(`${Music_App_API_URL}/sign-in`, { email: username, pwd: password })
      .then((res) => {
        console.log(res);
        if (res.data) {
          setIsLogin(true);
          navigate("/");
          setAuthor(res.data[0]);
          localStorage.setItem("author", JSON.stringify(res.data[0]));
        } else {
          alert("Please try to login!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="SignIn" style={{ marginBottom: "23rem" }}>
      <section className="section pt-55 mb-50" style={{ marginTop: "45px" }}>
        <div className="container">
          <div className="sign widget ">
            <div className="section-title">
              <h5>Login</h5>
            </div>
            <form action="#" className="sign-form widget-form " method="post">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username*"
                  name="username"
                  value={username}
                  onChange={handleUsername}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password*"
                  name="password"
                  value={password}
                  onChange={handlePassword}
                />
              </div>
              <div className="sign-controls form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="rememberMe"
                  />
                  <label className="custom-control-label" htmlFor="rememberMe">
                    Remember Me
                  </label>
                </div>
              </div>
              <div className="form-group">
                <button
                  type="button"
                  className="btn-custom"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>

              <p className="form-group text-center">
                Don't have an account?{" "}
                <Link to="/sign-up" className="btn-link">
                  Create One
                </Link>{" "}
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
