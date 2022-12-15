import TopWikimizikUser from "../components/TopWikimizikUser";
import "../assets/scss/addNewSong.scss";
import { useContext, useState } from "react";
import { ModeContext } from "../context/ModeContext";
import axios from "axios";
import { Music_App_API_URL } from "../utils/globalVariables";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [newPasswordConf, setNewPasswordConf] = useState();
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const { author } = useContext(ModeContext);

  console.log(author);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    resetPassword();
  };

  const resetPassword = async () => {
    if (
      !(oldPassword == undefined) &&
      !(oldPassword == "") &&
      !(newPassword == undefined) &&
      !(newPassword == "") &&
      !(newPasswordConf == undefined) &&
      !(newPasswordConf == "")
    ) {
      if (newPassword === newPasswordConf) {
        await axios
          .post(`${Music_App_API_URL}/resetpassword`, {
            author: author.id,
            old_password: oldPassword,
            new_password: newPassword,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setError1(true);
      }
    } else {
      setError2(true);
    }
  };

  return (
    <div className="addNewSong">
      <section className="section masonry-layout pt-45">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <div className="categorie-title">
                <h3>
                  <span>Reset Password </span>
                </h3>
              </div>

              {error1 && (
                <p className="text-danger">
                  New Password and Confirm Password Does not Match
                </p>
              )}
              {error2 && (
                <p className="text-danger">Please fill data properly</p>
              )}

              <form className="mb-5 widget-form">
                <div className="form-group">
                  <label htmlFor="old_password">
                    <b>Old Password</b>
                  </label>
                  <input
                    required
                    type="password"
                    className="form-control"
                    id="old_password"
                    placeholder="Old Password *"
                    onChange={(e) => {
                      setOldPassword(e.target.value);
                      setError1(false);
                      setError2(false);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="new_password">
                    <b>New Password</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="new_password"
                    placeholder="New Password *"
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setError1(false);
                      setError2(false);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="new_conf_password">
                    <b>Confirm Password</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="new_conf_password"
                    placeholder="Confirm Password *"
                    onChange={(e) => {
                      setNewPasswordConf(e.target.value);
                      setError1(false);
                      setError2(false);
                    }}
                  />
                </div>
                <button
                  type="button"
                  className="btn-custom"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="col-md-4">
              <TopWikimizikUser />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
