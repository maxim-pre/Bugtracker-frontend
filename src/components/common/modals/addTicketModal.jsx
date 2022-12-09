import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import AddTicketForm from "../../addTicketForm";

const CreateTicketModal = ({ show, onClose, developers, project_id }) => {
  return (
    <Modal show={show}>
      <Modal.Header>
        <h5 className="modal-title">Create a new ticket</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => onClose()}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <AddTicketForm developers={developers} project_id={project_id} />
      </Modal.Body>
    </Modal>
  );
};

export default CreateTicketModal;
