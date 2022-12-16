import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../assets/scss/postDetail.scss";
import Comment from "../components/Comment";
import Loading from "../components/Loading";
import TopWikimizikUser from "../components/TopWikimizikUser";
import { ModeContext } from "../context/ModeContext";

const Article = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState("");
  const [loading, setLoading] = useState(false);
  const { allArticles } = useContext(ModeContext);

  useEffect(() => {
    setLoading(true);
    const item = allArticles?.filter((data) => {
      return data.title === id;
    });
    if (item) {
      setLoading(false);
      setPostData(item[0]);
    }
  }, [allArticles]);

  return (
    <div className="post-detail">
      <section className="section pt-55 masonry-layout">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8 mb-20">
              <div className="post-single">
                {loading && (
                  <div className="col-lg-12 mb-5">
                    <Loading />
                  </div>
                )}
                <div className="post-single-image text-center">
                  <img
                    src={
                      "assets/images/articles/article" + postData.id + ".jpg"
                    }
                    alt=""
                    width="1200"
                  />
                </div>
                <div className="post-single-content">
                  <h4>
                    {postData.title} - {postData.author}
                  </h4>
                  <div className="post-single-info">
                    <ul className="list-inline">
                      <li>
                        <Link to="">
                          <img
                            src={
                              "assets/images/articles/article" +
                              postData.id +
                              ".jpg"
                            }
                            alt=""
                          />
                        </Link>
                      </li>
                      <li>
                        <Link to="author.html">David Smith</Link>{" "}
                      </li>
                      <li className="dot"></li>
                      <li>January 15, 2021</li>
                      <li className="dot"></li>
                      <li>3 comments</li>
                    </ul>
                  </div>
                </div>

                {/* <div className="post-single-body">{postData.body}</div> */}
                <div
                  className="post-single-body"
                  dangerouslySetInnerHTML={{ __html: postData.body }}
                ></div>

                <div className="post-single-footer">
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

              <div className="widget mb-50">
                <div className="title">
                  <h5>1 Comment</h5>
                </div>
                <ul className="widget-comments">
                  <Comment commentData={postData} />
                </ul>
                <div className="title">
                  <h5>Leave a Reply</h5>
                </div>
                <form
                  className="widget-form"
                  action="#"
                  method="POST"
                  id="main_contact_form"
                >
                  <p>
                    Your email adress will not be published ,Requied fileds are
                    marked*.
                  </p>
                  <div
                    className="alert alert-success contact_msg"
                    style={{ display: "none" }}
                    role="alert"
                  >
                    Your message was sent successfully.
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          name="message"
                          id="message"
                          cols="30"
                          rows="5"
                          className="form-control"
                          placeholder="Message*"
                          required="required"
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="form-control"
                          placeholder="Name*"
                          required="required"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="form-control"
                          placeholder="Email*"
                          required="required"
                        />
                      </div>
                    </div>
                    <div className="col-12 mb-20">
                      <div className="form-group">
                        <input
                          type="text"
                          name="website"
                          id="website"
                          className="form-control"
                          placeholder="website"
                        />
                      </div>
                      <label>
                        <input
                          name="name"
                          type="checkbox"
                          value="1"
                          required="required"
                        />
                        <span className="ml-2">
                          save my name , email and website in this browser for
                          the next time I comment.
                        </span>
                      </label>
                    </div>
                    <div className="col-12">
                      <button
                        type="submit"
                        name="submit"
                        className="btn-custom"
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4 max-width">
              <TopWikimizikUser />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Article;
