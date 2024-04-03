import { createContext } from "react";
import { useState, useId } from "react";

const MemberContext = createContext({
  members: [],
  selectedMember: {},
  addMember: () => {},
  removeMember: () => {},
  setName: () => {},
  setSalary: () => {},
  setDiscounts: () => {},
  setIsSelected: () => {},
  selectedMember: {},
});

export default MemberContext;

export function MemberContextProvider({ children }) {
  const [members, setMembers] = useState([]);
  const [idCounter, setIdCounter] = useState(0);

  function addMember() {
    setMembers((prevMembers) => [
      ...prevMembers,
      {
        id: idCounter,
        name: "",
        salary: 0,
        discounts: {
          under25: { isActive: false },
          taxDiscount: { isActive: false },
          familyDiscount: { isActive: false },
          freshMerried: { isActive: false },
        },
        isSelected: false,
      },
    ]);
    setIdCounter(idCounter + 1);
  }

  function removeMember(id) {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member.id !== id),
    );
  }

  function getSelectedMember() {
    return members.find((member) => member.isSelected === true);
  }

  function setName(id, name) {
    setMembers((prevMembers) =>
      prevMembers.map((member) => {
        if (member.id === id) {
          return { ...member, name };
        }
        return member;
      }),
    );
  }

  function setSalary(id, salary) {
    setMembers((prevMembers) =>
      prevMembers.map((member) => {
        if (member.id === id) {
          return { ...member, salary };
        }
        return member;
      }),
    );
  }

  function setIsSelected(id, isSelected) {
    setMembers((prevMembers) =>
      prevMembers.map((member) => {
        if (member.id === id) {
          return { ...member, isSelected };
        }
        return member;
      }),
    );
  }

  function setDiscounts(id, discounts) {
    setMembers((prevMembers) =>
      prevMembers.map((member) => {
        if (member.id === id) {
          return { ...member, discounts };
        }
        return member;
      }),
    );
  }

  const ctx = {
    members,
    addMember,
    removeMember,
    setName,
    setSalary,
    setDiscounts,
    setIsSelected,
    selectedMember: getSelectedMember(),
  };

  return (
    <MemberContext.Provider value={ctx}>{children}</MemberContext.Provider>
  );
}
