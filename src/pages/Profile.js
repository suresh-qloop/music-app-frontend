import { useContext, useEffect, useState } from "react";
import TopWikimizikUser from "../components/TopWikimizikUser";
import { ModeContext } from "../context/ModeContext";
import "../assets/scss/profile.scss";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";

const Profile = () => {
  const { id } = useParams();
  const { allSongs, allUsers } = useContext(ModeContext);
  const [authorSongs, setAuthorSongs] = useState();
  const [showCount, setShowCount] = useState(6);
  const [showMoreTxt, setShowMoreTxt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    setLoading(true);
    const item = allUsers?.filter((data) => {
      return data.id == id;
    });
    if (item) {
      setLoading(false);
      setUser(item[0]);
    }
  }, [allSongs]);

  useEffect(() => {
    const items = [];
    allSongs?.map((data) => {
      if (data.insert_user == id) {
        items.push(data);
      }
    });
    setAuthorSongs(items);
  }, [user]);

  const handleShowMode = () => {
    if (!showMoreTxt) {
      setShowCount(authorSongs?.length);
    } else {
      setShowCount(6);
    }
    setShowMoreTxt(!showMoreTxt);
  };

  return (
    <div className="profile">
      <section className="section masonry-layout mb-40 pt-55">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="widget-author inner-width">
                <Link to="author.html" className="image">
                  <img src="../assets/images/users.png" alt="" />
                </Link>
                <h6>
                  <span>Hi, I'm {user?.username}</span>
                </h6>
                <div className="link">{user?.total_pts} Points</div>
                <div className="link">{authorSongs?.length} Songs</div>
                <div className="link">
                  <Link to="/reset-password">Reset Password</Link>
                </div>

                <p>
                  {" "}
                  I'm {user?.username}, husband and father , I love
                  Photography,travel and nature. I'm working as a writer and
                  blogger with experience of 5 years until now.
                </p>

                <div className="social-media">
                  <ul className="list-inline">
                    <li>
                      <Link to="#" className="color-facebook">
                        <i className="fab fa-facebook"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="color-instagram">
                        <i className="fab fa-instagram"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="color-twitter">
                        <i className="fab fa-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="color-youtube">
                        <i className="fab fa-youtube"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="color-pinterest">
                        <i className="fab fa-pinterest"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-8">
              <div className="row">
                {authorSongs?.map((data, index) => {
                  if (index < showCount) {
                    return (
                      <div className="col-lg-6" key={index}>
                        <div className="post-card">
                          <div className="post-card-content">
                            <Link
                              to={`/lyrics/${data.title}`}
                              className="categorie"
                            >
                              {data.artist}
                            </Link>
                            <h5>
                              <Link to={`/lyrics/${data.title}`}>
                                {data.title}
                              </Link>
                            </h5>
                            <div className="post-card-info">
                              <ul className="list-inline">
                                <li>
                                  <Link to="author.html">
                                    <img
                                      src="../assets/images/songs.jpg"
                                      alt=""
                                    />
                                  </Link>
                                </li>
                                <li>
                                  <Link to="author.html">{user?.username}</Link>
                                </li>
                                <li className="dot"></li>
                                <li>{data.year}</li>
                                <li className="dot"></li>
                                <li>{data.views} views</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
                {loading && (
                  <div className="col-lg-12 mb-5">
                    <Loading />
                  </div>
                )}
                <div className="col-md-12">
                  <button className="form-control" onClick={handleShowMode}>
                    {!showMoreTxt ? "Show More" : "Less more"}
                  </button>
                </div>
              </div>
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

export default Profile;
