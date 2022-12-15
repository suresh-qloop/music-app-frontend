import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { ModeContext } from "../context/ModeContext";
import { FaUser, FaUsers } from "react-icons/fa";

const TopWikimizikUser = () => {
  const { allUsers } = useContext(ModeContext);
  return (
    <div className="widget">
      <div className="section-title">
        <h5>
          Top Wikimizik Users <FaUsers />
        </h5>
      </div>
      <ul className="widget-categories">
        {allUsers?.map((item, index) => {
          if (index < 10) {
            return (
              <Fragment key={index}>
                <li>
                  <Link to={`/profile/${item.id}`} className="categorie">
                    <FaUser /> {item.username}
                  </Link>
                  <span className="ml-auto">
                    {item.total_pts.toLocaleString()} Posts
                  </span>
                </li>
              </Fragment>
            );
          } else {
            return;
          }
        })}
      </ul>
    </div>
  );
};

export default TopWikimizikUser;
