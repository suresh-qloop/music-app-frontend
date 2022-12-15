import { Link } from "react-router-dom";

const Artist = (props) => {
  const { data } = props;
  return (
    <div className="card">
      <div className="post-card">
        <div className="post-card-image">
          <Link to="/">
            <img
              src={`assets/images/artists/` + data.pic_name + `.jpg`}
              alt=""
              width="1200"
              height="1500"
            />
          </Link>
        </div>
        <div className="post-card-content">
          <h6 className="text-center">
            <Link to="">{data.name}</Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Artist;
