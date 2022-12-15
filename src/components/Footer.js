import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="copyright">
              <p>
                <Link to="/" className="mr-3">
                  About
                </Link>
                <Link to="/" className="mr-3">
                  Privacy Policy
                </Link>
                <Link to="/" className="mr-3">
                  Terms or Use
                </Link>
                <Link to="/contact" className="mr-3">
                  Contact
                </Link>
              </p>
            </div>
            <div className="back">
              <Link to="/" className="back-top">
                <i className="arrow_up"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
