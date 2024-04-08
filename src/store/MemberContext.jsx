import { createContext } from "react";
import { useState, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import useLocalStorage from "../hooks/useLocalStorage";

const MemberContext = createContext({
  members: [],
  selectedMember: {},
  addMember: () => {},
  removeMember: () => {},
  setName: () => {},
  setSalary: () => {},
  setDiscounts: () => {},
  setIsSelected: () => {},
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
  const [storedMembers, setStoredMembers] = useLocalStorage("members", []);
  const [members, dispatch] = useReducer(memberReducer, storedMembers);

  useEffect(() => {
    setStoredMembers(members);
  }, [members]);

  const addMember = () => {
    dispatch({
      type: "ADD_MEMBER",
      payload: {
        id: uuidv4(),
        name: "",
        salary: 0,
        discounts: {
          UNDER_TWENTY_FIVE_DISCOUNT: { isActive: false },
          TAX_DISCOUNT: { isActive: false },
          FAMILY_DISCOUNT: {
            isActive: false,
            supportedChildren: 0,
            beneficiaryChildren: 0,
          },
          FRESH_MERRIED_DISCOUNT: { isActive: false, isEligible: false },
        },
        isSelected: false,
      },
    });
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

  const ctx = {
    members,
    selectedMember: getSelectedMember(),
    addMember,
    removeMember,
    setName,
    setSalary,
    setDiscounts,
    setIsSelected,
  };

  return (
    <MemberContext.Provider value={ctx}>{children}</MemberContext.Provider>
  );
}
