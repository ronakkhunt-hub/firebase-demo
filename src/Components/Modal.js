import React from "react";
import Modal from "react-bootstrap/Modal";

function ReactModal(props) {
  const { title, show, onClose, children } = props;
  return (
    <div style={{ zIndex: 99999 }}>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ textTransform: "capitalize" }}>
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </div>
  );
}

export default ReactModal;
