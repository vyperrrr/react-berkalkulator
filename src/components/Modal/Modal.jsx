import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";
import propTypes from "prop-types";
import { Cross1Icon } from "@radix-ui/react-icons";

const Modal = forwardRef(function Modal({ children }, ref) {
  const modalRef = useRef(null);

  useImperativeHandle(ref, () => ({
    open: () => modalRef.current.showModal(),
    close: () => modalRef.current.close(),
  }));

  const modalRoot = document.getElementById("modal-root");

  const content = (
    <dialog ref={modalRef} className="m-auto p-10">
      <button
        className="absolute top-1 right-1"
        onClick={() => modalRef.current.close()}
      >
        <Cross1Icon />
      </button>
      <section className="m-auto">{children}</section>
    </dialog>
  );

  modalRoot && createPortal(content, modalRoot);

  return content;
});

Modal.propTypes = {
  children: propTypes.node,
};

export default Modal;
