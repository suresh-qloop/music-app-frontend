import Card from "../components/ArticlesCard";
import CarouselDatas from "../utils/HomeCarousels.json";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { ModeContext } from "../context/ModeContext";
import "../assets/scss/home.scss";
import { Fragment, useContext } from "react";
import Form from "react-bootstrap/Form";

const Home = () => {
  const { allSongs, nowTrendings, allArticles } = useContext(ModeContext);
  return (
    <div className={`home`}>
      <section className="section masonry-layout pt-45">
        <div className="container-fluid mt-5">
          <div className="post-single-gallery">
            <Carousel>
              {CarouselDatas.map((item) => {
                return (
                  <Carousel.Item key={item.id}>
                    <img
                      className="d-block w-100"
                      src={item.img}
                      alt={`${item.id} slider`}
                    />
                    <button className="btn-next"></button>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>
        </div>
        <div className="container-fluid most-recent">
          <div className="row">
            <div className="col-md-12">
              <div className="card-columns">
                <div className="card">
                  <div className="widget ">
                    <div className="section-title">
                      <h5>
                        MOST <b className="text-red">RECENT</b>
                      </h5>
                    </div>
                    <ul className="widget-latest-posts">
                      {allSongs?.map((item, index) => {
                        if (index < 10) {
                          return (
                            <Fragment key={index}>
                              <li className="last-post">
                                <div className="content">
                                  <p>
                                    <Link to={`/lyrics/${item.title}`}>
                                      <b>{item.title} - </b>
                                      {item.artist}
                                    </Link>
                                  </p>
                                  <small>
                                    <span className="icon_clock_alt"></span>
                                    {item.year}
                                  </small>
                                </div>
                              </li>
                            </Fragment>
                          );
                        }
                      })}
                    </ul>
                  </div>
                </div>
                <div className="card">
                  <div className="widget ">
                    <div className="section-title">
                      <h5>
                        NOW <b className="text-red">TRENDING</b>
                      </h5>
                    </div>
                    <ul className="widget-latest-posts">
                      {nowTrendings?.map((item, index) => {
                        return (
                          <Fragment key={index}>
                            <li className="last-post">
                              <div className="content">
                                <p>
                                  <Link to={`/lyrics/${item.title}`}>
                                    <b>{item.title} - </b>
                                    {item.artist}
                                  </Link>
                                </p>
                                <small>
                                  <span className="icon_clock_alt"></span>
                                  {item.year}
                                </small>
                              </div>
                            </li>
                          </Fragment>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="card">
                  <div className="widget ">
                    <div className="post-card">
                      <div className="social-icones d-flex justify-content-center">
                        <ul className="list-inline">
                          <li>
                            <Link to="/">
                              <i className="fab fa-facebook-f"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <i className="fab fa-twitter"></i>{" "}
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <i className="fab fa-instagram"></i>{" "}
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <i className="fab fa-youtube"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid articles">
          <div className="row">
            <div className="col-lg-12">
              <div className="card-columns">
                {allArticles?.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <Card data={item} />
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
