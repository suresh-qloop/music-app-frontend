import { Link } from "react-router-dom";

const NewsLetter = () => {
    return (
        <section className="newslettre">
            <div className="container-fluid">
                <div className="newslettre-width text-center">
                    <div className="newslettre-info">
                        <h5>Subscribe to our Newslatter</h5>
                        <p> Sign up for free and be the first to get notified about new posts. </p>
                    </div>
                    <form action="#" className="newslettre-form">
                        <div className="form-flex">
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Your email adress" required="required" />
                            </div>
                            <button className="submit-btn" type="submit">Subscribe</button>
                        </div>
                    </form>
                    <div className="social-icones">
                        <ul className="list-inline">
                            <li>
                                <Link to="/">
                                    <i className="fab fa-facebook-f"></i>Facebook</Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <i className="fab fa-twitter"></i>Twitter </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <i className="fab fa-instagram"></i>Instagram </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <i className="fab fa-youtube"></i>Youtube</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NewsLetter;