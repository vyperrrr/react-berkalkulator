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
    setMembers((prevMembers) => {
      const members = [...prevMembers];
      const member = members.find((member) => member.id === id);
      member.name = name;
      return members;
    });
  }

  function setSalary(id, salary) {
    setMembers((prevMembers) => {
      const members = [...prevMembers];
      const member = members.find((member) => member.id === id);
      member.salary = salary;
      return members;
    });
  }

  function setIsSelected(id, isSelected) {
    setMembers((prevMembers) => {
      prevMembers.forEach((member) => (member.isSelected = false));
      const members = [...prevMembers];
      const selectedMember = members.find((member) => member.id === id);
      selectedMember.isSelected = isSelected;
      return members;
    });
  }

  function setDiscounts(id, discounts) {
    setMembers((prevMembers) => {
      const members = [...prevMembers];
      const member = members.find((member) => member.id === id);
      member.discounts = discounts;
      return members;
    });
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
