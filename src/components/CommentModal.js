import { Button, Modal } from "react-bootstrap";

const CommentModal = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
    >
      {/* <Modal.Header >
            <Modal.Title id="contained-modal-title-vcenter">
                {props.data.line_txt}
            </Modal.Title>
        </Modal.Header> */}
      <Modal.Body>
        <h4>{props.data?.line_txt}</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={props.onHide}
          style={{ backgroundColor: "#fea700", borderColor: "#fea700" }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentModal;
