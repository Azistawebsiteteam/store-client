import React from "react";
import Modal from "react-bootstrap/Modal";
import { CreateReview } from "./CustomerRating";

const MyVerticallyCenteredModal = (props) => {
  const { reviewDetails } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Review
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateReview buttonText={"Update"} reviewDetails={reviewDetails} />
      </Modal.Body>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
