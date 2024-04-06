import { createContext } from "react";
import { useState, useReducer } from "react";

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

function memberReducer(state, action) {
  switch (action.type) {
    case "ADD_MEMBER":
      return [...state, action.payload];
    case "REMOVE_MEMBER":
      return state.filter((member) => member.id !== action.payload);
    case "SET_NAME":
      return state.map((member) =>
        member.id === action.payload.id
          ? { ...member, name: action.payload.name }
          : member,
      );
    case "SET_SALARY":
      return state.map((member) =>
        member.id === action.payload.id
          ? { ...member, salary: action.payload.salary }
          : member,
      );
    case "SET_DISCOUNTS":
      return state.map((member) =>
        member.id === action.payload.id
          ? { ...member, discounts: action.payload.discounts }
          : member,
      );
    case "SET_IS_SELECTED":
      return state.map((member) =>
        member.id === action.payload.id
          ? { ...member, isSelected: action.payload.isSelected }
          : { ...member, isSelected: false },
      );
    default:
      return state;
  }
}

export function MemberContextProvider({ children }) {
  const [members, dispatch] = useReducer(memberReducer, []);
  const [idCounter, setIdCounter] = useState(0);

  const addMember = () => {
    dispatch({
      type: "ADD_MEMBER",
      payload: {
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
    });
    setIdCounter(idCounter + 1);
  };

  const removeMember = (id) => {
    dispatch({ type: "REMOVE_MEMBER", payload: id });
  };

  const setName = (id, name) => {
    dispatch({ type: "SET_NAME", payload: { id, name } });
  };

  const setSalary = (id, salary) => {
    dispatch({ type: "SET_SALARY", payload: { id, salary } });
  };

  const setDiscounts = (id, discounts) => {
    dispatch({ type: "SET_DISCOUNTS", payload: { id, discounts } });
  };

  const setIsSelected = (id, isSelected) => {
    dispatch({ type: "SET_IS_SELECTED", payload: { id, isSelected } });
  };

  const getSelectedMember = () => {
    return members.find((member) => member.isSelected);
  };

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
