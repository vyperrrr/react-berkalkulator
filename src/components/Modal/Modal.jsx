import { Dialog } from "@radix-ui/themes";

const Modal = ({ TriggerElement, title, description, children }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{TriggerElement}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {description}
        </Dialog.Description>
        {children}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Modal;
