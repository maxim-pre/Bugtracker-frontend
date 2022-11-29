import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import UpdateProjectForm from "../../updateProjectForm";

const UpdateProjectModal = ({ show, project, onClose }) => {
  return (
    <Modal show={show}>
      <Modal.Header>
        <h5 className="modal-title">
          {project === null
            ? "updateProject"
            : `update Project (${project.name})`}
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => onClose()}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <UpdateProjectForm project={project} />
      </Modal.Body>
    </Modal>
  );
};

export default UpdateProjectModal;
