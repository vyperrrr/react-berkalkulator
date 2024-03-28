import Modal from "../Modal/Modal";
import { useRef } from "react";
import propTypes from "prop-types";
import { PlusIcon } from "@radix-ui/react-icons";

const AddFamilyMember = ({ onAddMember }) => {
  const modalRef = useRef(null);

  function handleAddMember(event) {
    event.preventDefault();
    modalRef.current.close();

    const form = event.target;
    const formData = new FormData(form);
    const name = formData.get("name");

    onAddMember((members) => [
      ...members,
      {
        id: members.length + 1,
        name,
      },
    ]);
  }

  return (
    <>
      <button
        className="py-2 px-4 bg-secondary text-white rounded-md font-semibold"
        onClick={() => modalRef.current.open()}
      >
        <PlusIcon />
      </button>
      <Modal ref={modalRef}>
        <form onSubmit={handleAddMember}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
          <button type="submit">Add</button>
        </form>
      </Modal>
    </>
  );
};

AddFamilyMember.propTypes = {
  onAddMember: propTypes.func,
};

export default AddFamilyMember;
