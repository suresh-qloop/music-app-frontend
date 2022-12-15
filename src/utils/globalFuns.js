import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const genCharArray = (charA, charZ) => {
  const alphabetArray = [];
  var i = charA.charCodeAt(0),
    j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
    alphabetArray.push(String.fromCharCode(i));
  }
  return alphabetArray;
};

export const useWindowScrollPositions = () => {
  const [scrollPosition, setPosition] = useState({ scrollX: 0, scrollY: 0 });

  useEffect(() => {
    function updatePosition() {
      setPosition({ scrollX: window.scrollX, scrollY: window.scrollY });
    }

    window.addEventListener("scroll", updatePosition);
    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};

export const ScrollTop = () => {
  const { scrollY } = useWindowScrollPositions();
  const [scroll, setScroll] = useState(0);
  const [isHover, setIsHover] = useState(false);

  const style = {
    position: "fixed",
    width: "45px",
    height: "45px",
    fontSize: "20px",
    bottom: "15px",
    right: "30px",
    color: isHover ? "#fea700" : "#fff",
    textAlign: "center",
    zIndex: "99",
    borderRadius: "50%",
    backgroundColor: isHover ? "transparent" : "#fea700",
    border: "1px solid #fea700",
    outline: "0",
    cursor: "pointer",
    transition: "0.3s linear",
  };

  const handleOver = () => {
    setIsHover(!isHover);
  };

  const handleLeave = () => {
    setIsHover(!isHover);
  };

  useEffect(() => {
    if (scrollY > 300) {
      setScroll(1);
    } else {
      setScroll(0);
    }
  }, [scrollY]);

  return (
    <>
      {scroll === 1 && (
        <button
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
          onMouseEnter={handleOver}
          onMouseLeave={handleLeave}
          style={style}
        >
          <i
            className="arrow_up"
            style={{ color: isHover ? "#fea700" : "#fff" }}
          ></i>
        </button>
      )}
    </>
  );
};

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
