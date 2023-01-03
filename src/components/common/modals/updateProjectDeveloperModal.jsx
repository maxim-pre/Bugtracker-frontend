import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import UpdateProjectDeveloperForm from "../../updateProjectDeveloperForm";
import EditTicketForm from "../../updateTicketFrom";

const UpdateProjectDeveloperModal = ({
  show,
  onClose,
  developer,
  project_id,
}) => {
  return (
    <Modal show={show}>
      <Modal.Header>
        <h5 className="modal-title">update Member</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => onClose()}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <UpdateProjectDeveloperForm
          project_id={project_id}
          developer={developer}
        />
      </Modal.Body>
    </Modal>
  );
};

export default UpdateProjectDeveloperModal;
