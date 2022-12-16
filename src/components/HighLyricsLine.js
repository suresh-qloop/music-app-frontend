import { useRef, useState, useContext } from "react";
import { ModeContext } from "../context/ModeContext";
import {
  Overlay,
  Popover,
  Form,
  Button,
  OverlayTrigger,
} from "react-bootstrap";
import axios from "axios";
import { Music_App_API_URL } from "../utils/globalVariables";

const HighLyricsLine = (props) => {
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState();
  const [error, setError] = useState(false);
  const [file, setFile] = useState();
  const { author } = useContext(ModeContext);
  const target = useRef(null);
  const { item } = props;

  const explanations = async (item) => {
    if (!(comment == undefined) && !(comment == "")) {
      let data = new FormData();
      data.append("author", author.id);
      data.append("line_number", item.id);
      data.append("song_id", item.song_id);
      data.append("explanation", comment);
      if (file !== undefined) {
        data.append("file", file);
      }

      await axios
        .post(`${Music_App_API_URL}/add-explanation`, data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError(true);
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{item.line_txt}</Popover.Header>
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
        <Form>
          <Form.Group className="mb-3 mt-1" controlId="formBasicEmail">
            <Form.Label>ADD YOUR ANNOTATION</Form.Label>
            <Form.Control
              as="textarea"
              onChange={(e) => {
                setComment(e.target.value);
                setError(false);
              }}
              placeholder="Leave a comment here"
              style={{ height: "50px" }}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3 ">
            <Form.Label>Default file input </Form.Label>

            <Form.Control
              onChange={(e) => {
                // console.log(e.target.files[0]);
                setFile(e.target.files[0]);
              }}
              type="file"
              accept="application/pdf, image/*"
              style={{ height: "calc(1.5em + 0.75rem + 7px)" }}
            />
          </Form.Group>
          <Button
            onClick={() => {
              explanations(item);
            }}
            variant="primary"
          >
            Submit
          </Button>
          {error && (
            <p className="text-danger mt-3">Please fill data properly</p>
          )}
        </Form>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="right"
        overlay={popover}
        rootClose
      >
        <p
          style={{
            color: "#fea700",
            cursor: "pointer",
            display: "inline-block",
          }}
          ref={target}
          onClick={() => setShow(!show)}
        >
          {item.line_txt}
        </p>
      </OverlayTrigger>
    </>
  );
};

export default HighLyricsLine;
