import { Flex, Container, Box } from "@radix-ui/themes";

import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";

import MemberContext from "../store/MemberContext";
import { useContext } from "react";

const HouseholdSalaryCalculator = () => {
  const { selectedMember } = useContext(MemberContext);
  return (
    <Container className="">
      <Box p="4" className="space-y-2">
        <FamilyMemberTabs />
        {selectedMember !== undefined && (
          <Flex
            direction="row"
            gapX={{ initial: "0", sm: "6" }}
            gapY={{ initial: "6", md: "0" }}
            wrap={{ initial: "wrap", md: "nowrap" }}
            className="justify-center"
          >
            <SalaryCalculator />
            <HouseholdSummary />
          </Flex>
        )}
      </Box>
    </Container>
  );
};

export default HouseholdSalaryCalculator;
