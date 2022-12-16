import React from "react";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="spinner-border text-secondary "
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      />
    </div>
  );
};

export default Loading;
