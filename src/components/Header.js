import { useEffect, useState } from "react";
import { useContext } from "react";
import { ModeContext } from "../context/ModeContext";
import { Link, useNavigate } from "react-router-dom";
import "../assets/scss/header.scss";
import axios from "axios";
import { Music_App_API_URL } from "../utils/globalVariables";

const Header = () => {
  const navigate = useNavigate();
  const { theme, pageName, setTheme, setPageName, isLogin, author } =
    useContext(ModeContext);
  const [hambugrClass, setHambugoClass] = useState("d-flex");

  const [isActive, setIsActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { innerWidth } = window;
  const headerDatas = [
    { name: "Home", path: "" },
    { name: "Browse", path: "browse" },
    { name: "Add New Song", path: "add-new-song" },
    { name: "Videos", path: "videos" },
  ];

  const handleClick = (event) => {
    setIsActive((current) => !current);
  };

  const getSearchResult = async (e) => {
    e.preventDefault();
    document.getElementById("create-course-form").reset();
    setIsActive(false);
    navigate(`/search-result?search_query=${searchValue}`);
    // await axios
    //   .post(`${Music_App_API_URL}/search-result?search_query=${searchValue}`)
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handleMode = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const handleHambugr = () => {
    if (innerWidth <= 767) {
      if (hambugrClass === "d-flex justify-content-start") {
        setHambugoClass("d-none");
      } else {
        setHambugoClass("d-flex justify-content-start");
      }
    }
  };

  useEffect(() => {
    // console.log(isLogin);
  }, [isLogin]);

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <div className="logo mr-5">
          <a href="/">
            <img
              src="assets/img/logo_wikiwiki2.png"
              alt=""
              className="logo-dark"
            />
            <img
              src="assets/img/logo_wikiwiki2.png"
              alt=""
              className="logo-white"
            />
          </a>
        </div>

        <div
          className={`collapse navbar-collapse ${hambugrClass}" id="main_nav`}
        >
          <ul className="navbar-nav mr-auto">
            {headerDatas.map((item, index) => {
              return (
                <li className="nav-item" key={index}>
                  <Link
                    className={`nav-link ${
                      pageName === item.path ? "active" : ""
                    }`}
                    to={`/${item.path}`}
                    onClick={() => setPageName(item.path)}
                  >
                    {" "}
                    {item.name}{" "}
                  </Link>
                </li>
              );
            })}
            {/* <li className="nav-item">
              <form className=" widget-form" onSubmit={getSearchResult}>
                <div className="form-group mb-0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                  />
                </div>
              </form>
            </li> */}
          </ul>
        </div>

        <div className="navbar-right ml-auto">
          <div className="theme-switch-wrapper">
            <label className="theme-switch" htmlFor="checkbox">
              <input type="checkbox" id="checkbox" onChange={handleMode} />
              <div className="slider round"></div>
            </label>
          </div>
          <div className="social-icones">
            <ul className="list-inline">
              <li>
                <Link to="#">
                  <i className="fab fa-facebook-f"></i>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="fab fa-instagram"></i>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="fab fa-twitter"></i>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="fab fa-youtube"></i>
                </Link>
              </li>
            </ul>
          </div>
          <ul className="navbar-nav mr-auto auth">
            <li className="nav-item">
              {!isLogin ? (
                <Link
                  className={`nav-link ${
                    pageName === "sign-in" ? "active" : ""
                  }`}
                  to="/sign-in"
                  onClick={() => setPageName("sign-in")}
                >
                  {" "}
                  Sign In{" "}
                </Link>
              ) : (
                <Link
                  className={`nav-link ${
                    pageName === "sign-in" ? "active" : ""
                  }`}
                  to={`/profile/${author.id}`}
                  onClick={() => setPageName("sign-in")}
                >
                  {" "}
                  Hello {author.username}{" "}
                </Link>
              )}
            </li>
          </ul>
          <div className="search-icon ml-3" onClick={handleClick}>
            <i className="icon_search "></i>
          </div>
          <div className={isActive ? "search search-open " : "search"}>
            <div className="container-fluid">
              <div className="search-width text-center">
                <button type="button" className="close" onClick={handleClick}>
                  <i className="icon_close"></i>
                </button>
                <form
                  className="search-form"
                  id="create-course-form"
                  onSubmit={getSearchResult}
                >
                  <input
                    type="search"
                    placeholder="What are you looking for?"
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                  />
                  <button type="submit" className="search-btn">
                    search
                  </button>
                </form>
              </div>
            </div>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#main_nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleHambugr}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Header;
