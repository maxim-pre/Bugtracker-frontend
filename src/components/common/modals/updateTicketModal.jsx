import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import EditTicketForm from "../../updateTicketFrom";

const UpdateTicketModal = ({
  show,
  onClose,
  developers,
  project_id,
  ticket,
}) => {
  return (
    <Modal show={show}>
      <Modal.Header>
        <h5 className="modal-title">Update Ticket</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => onClose()}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <EditTicketForm
          developers={developers}
          project_id={project_id}
          ticket={ticket}
        />
      </Modal.Body>
    </Modal>
  );
};

export default UpdateTicketModal;
