import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ArticlesCard = (props) => {
  const [imgPath, setImgPath] = useState("");
  const { data } = props;
  const locationPage = useLocation();

  useEffect(() => {
    if (
      locationPage.pathname.split("/").filter((item) => {
        return item === "lyrics";
      }).length > 0
    ) {
      setImgPath("../");
    }
  }, []);

  return (
    <div className="card">
      <div className="post-card">
        <div className="post-card-image">
          <Link to={`/${data.title}`}>
            <img
              src={
                imgPath + "assets/images/articles/article" + data.id + ".jpg"
              }
              alt=""
              width="1200"
              height="1500"
            />
          </Link>
        </div>
        <div className="post-card-content">
          <h5>
            <Link to={`/${data.title}`}>{data.title}</Link>
          </h5>
          {/* <p>{data.body.substring(0, 300)}...</p> */}
          <p
            id="img-none"
            dangerouslySetInnerHTML={{ __html: data.body.substring(0, 300) }}
          ></p>
        </div>
      </div>
    </div>
  );
};

export default ArticlesCard;
