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
  calculateNetSalary: () => {},
  calculateOverallNetSalary: () => {},
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

  function calculateNetSalary(member) {
    let salary = member.salary;
    let discounts = member.discounts;

    const RATE_SZJA = 15;
    const RATE_TB = 18.5;
    const PERSONAL_TAX_ALLOWANCE = 77_300;

    let totalTax = (salary * RATE_TB) / 100 + (salary * RATE_SZJA) / 100;

    let netSalary = 0;

    Object.entries(discounts).forEach(([key, value]) => {
      if (value.isActive) {
        switch (key) {
          case "under25":
            totalTax -= salary * (RATE_SZJA / 100);
            break;
          case "taxDiscount":
            totalTax -= PERSONAL_TAX_ALLOWANCE;
            break;
          case "familyDiscount":
            if (value.beneficiaryChildren === 0) break;
            if (value.beneficiaryChildren < 3)
              switch (value.beneficiaryChildren) {
                case 1:
                  netSalary += 10_000 * value.supportedChildren;
                  break;
                case 2:
                  netSalary += 20_000 * value.supportedChildren;
                  break;
                default:
                  break;
              }
            else {
              netSalary += 33_000 * value.supportedChildren;
            }
            break;
          case "freshMerried":
            if (value.isEligible) netSalary += 5000;
            break;
          default:
            break;
        }
      }
    });

    if (totalTax > 0) {
      netSalary += salary - totalTax;
    } else netSalary = salary;

    return netSalary;
  }

  function calculateOverallNetSalary() {
    let netSalary = 0;
    members.forEach((member) => (netSalary += calculateNetSalary(member)));
    return netSalary;
  }

  function setIsSelected(id, isSelected) {
    setMembers((prevMembers) =>
      prevMembers.map((member) => {
        if (member.id === id) {
          return { ...member, isSelected };
        }
        return { ...member, isSelected: !isSelected };
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
    selectedMember: getSelectedMember(),
    addMember,
    removeMember,
    setName,
    setSalary,
    setDiscounts,
    setIsSelected,
    calculateNetSalary,
    calculateOverallNetSalary,
  };

  return (
    <MemberContext.Provider value={ctx}>{children}</MemberContext.Provider>
  );
}
