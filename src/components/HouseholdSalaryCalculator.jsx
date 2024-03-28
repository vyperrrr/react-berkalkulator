import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import AddFamilyMember from "./AddFamilyMember/AddFamilyMember";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";
import { useState } from "react";

const HouseholdSalaryCalculator = () => {
  const [familyMembers, setFamilyMember] = useState([
    {
      id: 1,
      name: "John Doe",
      birthYear: 1980,
      salary: 2000,
    },
    {
      id: 2,
      name: "Jane Doe",
      birthYear: 1985,
      salary: 1200,
    },
    {
      id: 3,
      name: "Jack Doe",
      birthYear: 2010,
      salary: 0,
    },
  ]);

  console.log(familyMembers);

  return (
    <>
      <header className="flex gap-2">
        <FamilyMemberTabs members={familyMembers} setMember={setFamilyMember} />
        <AddFamilyMember onAddMember={setFamilyMember} />
      </header>
      <main>
        <SalaryCalculator />
        <HouseholdSummary />
      </main>
    </>
  );
};

export default HouseholdSalaryCalculator;
