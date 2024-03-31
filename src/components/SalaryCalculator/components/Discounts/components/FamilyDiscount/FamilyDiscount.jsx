import { Box, Flex, Text } from "@radix-ui/themes";
import LabeledSwitch from "../../../LabeledSwitch";
import Counter from "./components/Counter";

import { useState } from "react";

const FamilyDiscount = ({ discounts, handleDiscountChange }) => {
  const [supportedChildren, setSupportedChildren] = useState(0);
  const [beneficiaryChildren, setBeneficiaryChildren] = useState(0);

  return (
    <Box className="space-y-2">
      <LabeledSwitch
        label="Családi kedvezmény"
        labelSize="2"
        size="1"
        radius="small"
        checked={discounts.familyDiscount.isActive}
        onCheckedChange={(isChecked) =>
          handleDiscountChange("familyDiscount", isChecked)
        }
      />
      {discounts.familyDiscount.isActive && (
        <Box>
          <Flex gap="2" direction="column">
            <Text size="2">Eltartottak száma</Text>
            <Counter
              initialCount={supportedChildren}
              setCount={setSupportedChildren}
              min={0}
            />
            <Text size="2">Kedvezményezettek száma</Text>
            <Counter
              initialCount={beneficiaryChildren}
              setCount={setBeneficiaryChildren}
              min={0}
            />
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default FamilyDiscount;
