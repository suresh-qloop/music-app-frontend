import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModeContext } from "../context/ModeContext";
import { Music_App_API_URL } from "../utils/globalVariables";

const SignUp = () => {
  const [usename, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setIsLogin } = useContext(ModeContext);
  const navigate = useNavigate();

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async () => {
    await axios
      .post(`${Music_App_API_URL}/sign-up`, {
        username: usename,
        email: email,
        pwd: password,
        reg_date: 0,
        latest_pts: 0,
        total_pts: 0,
        lat_pts_date: 0,
      })
      .then((res) => {
        if (res.data.login) {
          setIsLogin(true);
          navigate("/");
        } else {
          alert("Please try to register!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="SignUp" style={{ marginBottom: "19rem" }}>
      <section className="section pt-55 mb-50" style={{ marginTop: "45px" }}>
        <div className="container-fluid">
          <div className="sign widget">
            <div className="section-title">
              <h5>Sign up</h5>
            </div>

            <form className="sign-form widget-form contact_form" method="post">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username*"
                  name="username"
                  value={usename || ""}
                  onChange={handleUsername}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address*"
                  name="email"
                  value={email || ""}
                  onChange={handleEmail}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password*"
                  name="password"
                  value={password || ""}
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
                    Agree to our{" "}
                    <Link to="#" className="btn-link">
                      terms & conditions
                    </Link>{" "}
                  </label>
                </div>
              </div>
              <div className="form-group">
                <button
                  type="button"
                  className="btn-custom"
                  onClick={handleSubmit}
                >
                  Sign Up
                </button>
              </div>
              <p className="form-group text-center">
                Already have an account?{" "}
                <Link to="/sign-in" className="btn-link">
                  Login
                </Link>{" "}
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
