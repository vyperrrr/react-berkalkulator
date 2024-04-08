import { Dialog } from "@radix-ui/themes";

const Modal = ({ title, description, isOpen, handleClose, children }) => {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Content
        onEscapeKeyDown={handleClose}
        onPointerDownOutside={handleClose}
        className="space-y-2"
      >
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
        {children}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Modal;
