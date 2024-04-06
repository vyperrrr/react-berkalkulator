import { Box, Flex, Text } from "@radix-ui/themes";
import LabeledSwitch from "@/components/SalaryCalculator/components/LabeledSwitch";
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
              count={supportedChildren}
              setCount={setSupportedChildren}
              onCountChange={() =>
                handleDiscountChange("familyDiscount", true, {
                  supportedChildren,
                  beneficiaryChildren,
                })
              }
              min={0}
            />
            <Text size="2">Kedvezményezettek száma</Text>
            <Counter
              count={beneficiaryChildren}
              setCount={setBeneficiaryChildren}
              onCountChange={() =>
                handleDiscountChange("familyDiscount", true, {
                  supportedChildren,
                  beneficiaryChildren,
                })
              }
              min={0}
              max={supportedChildren > 3 ? 3 : supportedChildren}
            />
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default FamilyDiscount;
