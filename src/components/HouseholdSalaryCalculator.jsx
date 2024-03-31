import { Flex, Container, IconButton, Box, Tabs } from "@radix-ui/themes";

import { PlusIcon } from "@radix-ui/react-icons";

import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";

const HouseholdSalaryCalculator = () => {
  return (
    <Container className="">
      <Box m="4">
        <Tabs.Root defaultValue="account" className="relative mb-4">
          <Tabs.List>
            <Tabs.Trigger value="account">Account</Tabs.Trigger>
            <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
            <IconButton className="absolute right-0">
              <PlusIcon width="18" height="18" />
            </IconButton>
          </Tabs.List>
        </Tabs.Root>
        <Flex
          direction="row"
          gapX={{ xs: "0", sm: "6" }}
          gapY={{ initial: "6", md: "0" }}
          wrap="wrap"
          className="justify-center"
        >
          <SalaryCalculator />
          <HouseholdSummary />
        </Flex>
      </Box>
    </Container>
  );
};

export default HouseholdSalaryCalculator;
