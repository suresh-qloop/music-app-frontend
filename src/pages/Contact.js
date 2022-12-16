import axios from "axios";
import { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/scss/browse.scss";
import TopWikimizikUser from "../components/TopWikimizikUser";
import { ModeContext } from "../context/ModeContext";
import { Music_App_API_URL } from "../utils/globalVariables";

const Contact = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [subject, setSubject] = useState();
  const [message, setMessage] = useState();

  const { allSongs } = useContext(ModeContext);

  const ContactForm = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("subject", subject);
    data.append("message", message);

    await axios
      .post(`${Music_App_API_URL}/contact`, data)
      .then((res) => {
        console.log(res);
        alert(res.data.message);
        document.getElementById("main_contact_form").reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="browse">
      <section className="section masonry-layout pt-45">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <div className="categorie-title mb-5">
                <h3>
                  <span>Contact Us</span>
                </h3>
              </div>
              <div className="contact">
                <div className="google-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3104.5761533072873!2d-78.19644468515456!3d38.91080675375955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b5c5dc680d0b2b%3A0x1e9ff0b6bb7a2f87!2s1000%20Proctor%20Ln%2C%20Front%20Royal%2C%20VA%2022630%2C%20%C3%89tats-Unis!5e0!3m2!1sfr!2sma!4v1578068093888!5m2!1sfr!2sma"
                    allowFullScreen=""
                  ></iframe>
                </div>
                <form
                  className="widget-form contact_form"
                  id="main_contact_form"
                  onSubmit={ContactForm}
                >
                  <h6>Feel free to contact any time.</h6>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptates, repudiandae.
                  </p>
                  <div
                    className="alert alert-success contact_msg"
                    style={{ display: "none" }}
                    role="alert"
                  >
                    Your message was sent successfully.
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      id="name"
                      className="form-control"
                      placeholder="Your Name*"
                      required="required"
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      id="email"
                      className="form-control"
                      placeholder="Your Email*"
                      required="required"
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="subject"
                      onChange={(e) => {
                        setSubject(e.target.value);
                      }}
                      id="subject"
                      className="form-control"
                      placeholder="Your Subject*"
                      required="required"
                    />
                  </div>

                  <div className="form-group">
                    <textarea
                      name="message"
                      id="message"
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                      cols="30"
                      rows="5"
                      className="form-control"
                      placeholder="Your Message*"
                      required="required"
                    ></textarea>
                  </div>

                  <button type="submit" name="submit" className="btn-custom">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-4">
              {/* <TopWikimizikUser /> */}
              <div className="widget ">
                <div className="section-title">
                  <h5>
                    MOST <b className="text-red">RECENT</b>
                  </h5>
                </div>
                <ul className="widget-latest-posts">
                  {allSongs?.map((item, index) => {
                    if (index < 6) {
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
              <div className="widget">
                <div className="section-title">
                  <h5>Instagram</h5>
                </div>
                <ul className="widget-instagram">
                  <li>
                    <a className="image" href="#">
                      <img src="assets/images/users.png" alt="" />
                    </a>
                  </li>
                  <li>
                    <a className="image" href="#">
                      <img src="assets/images/users.png" alt="" />
                    </a>
                  </li>
                  <li>
                    <a className="image" href="#">
                      <img src="assets/images/users.png" alt="" />
                    </a>
                  </li>
                  <li>
                    <a className="image" href="#">
                      <img src="assets/images/users.png" alt="" />
                    </a>
                  </li>
                  <li>
                    <a className="image" href="#">
                      <img src="assets/images/users.png" alt="" />
                    </a>
                  </li>
                  <li>
                    <a className="image" href="#">
                      <img src="assets/images/users.png" alt="" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
