import HouseholdSalaryCalculator from "./components/HouseholdSalaryCalculator";
import { MemberContextProvider } from "./store/MemberContext";

export default function App() {
  return (
    <>
      <MemberContextProvider>
        <HouseholdSalaryCalculator />
      </MemberContextProvider>
    </>
  );
}
