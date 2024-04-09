import { Flex, Container, Box, Heading } from "@radix-ui/themes";

import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";

import MemberContext from "../store/MemberContext";
import { useContext } from "react";

const HouseholdSalaryCalculator = () => {
  const { members, selectedMember } = useContext(MemberContext);
  return (
    <Container className="">
      <Box p="4" className="space-y-6">
        <FamilyMemberTabs />
        {members.length === 0 ? (
          <Heading className="text-center uppercase">
            Adj hozzá egy családtagot!
          </Heading>
        ) : (
          selectedMember === undefined && (
            <Heading className="text-center uppercase">
              Válassz ki egy családtagot az adatai megadásához!
            </Heading>
          )
        )}
        <Flex
          direction="row"
          gapX={{ initial: "0", sm: "6" }}
          gapY={{ initial: "6", md: "0" }}
          wrap={{ initial: "wrap", md: "nowrap" }}
          className="justify-center"
        >
          {selectedMember !== undefined && <SalaryCalculator />}
          <HouseholdSummary />
        </Flex>
      </Box>
    </Container>
  );
};

export default HouseholdSalaryCalculator;
