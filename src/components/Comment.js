import { Link } from "react-router-dom";

const Comment = (props) => {
  const { commentData } = props;
  return (
    <li className="comment-item">
      <img src={commentData.img} alt="" />
      <div className="content">
        <ul className="info list-inline">
          <li>Mohammed Ali</li>
          <li className="dot"></li>
          <li> January 15, 2021</li>
        </ul>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus
          at doloremque adipisci eum placeat quod non fugiat aliquid sit
          similique!
        </p>
        <div>
          <Link to="#" className="link">
            {" "}
            <i className="arrow_back"></i> Reply
          </Link>
        </div>
      </div>
    </li>
  );
};

export default Comment;
