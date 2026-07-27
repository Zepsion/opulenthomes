"use client";

import Modal from "./Modal.jsx";
import Button from "./Button.jsx";

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title = "Are you sure?", description, isLoading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-sm">
      <p className="text-sm text-charcoal-500">{description}</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
        <Button variant="danger" size="sm" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
