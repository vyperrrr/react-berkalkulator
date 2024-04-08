import { Box, Flex, Text } from "@radix-ui/themes";
import LabeledSwitch from "/src/components/SalaryCalculator/components/LabeledSwitch";
import Counter from "./components/Counter";

import { useState } from "react";

const FamilyDiscount = ({ discounts, updateDiscountProperties }) => {
  const [supportedChildren, setSupportedChildren] = useState(0);
  const [beneficiaryChildren, setBeneficiaryChildren] = useState(0);

  console.log(discounts);

  return (
    <Box className="space-y-2">
      <LabeledSwitch
        label="Családi kedvezmény"
        labelSize="2"
        size="1"
        radius="small"
        checked={discounts.FAMILY_DISCOUNT.isActive}
        onCheckedChange={(isChecked) =>
          updateDiscountProperties("FAMILY_DISCOUNT", {
            isActive: isChecked,
          })
        }
      />
      {discounts.FAMILY_DISCOUNT.isActive && (
        <Box>
          <Flex gap="2" direction="column">
            <Text size="2">Eltartottak száma</Text>
            <Counter
              count={supportedChildren}
              setCount={setSupportedChildren}
              onCountChange={() =>
                updateDiscountProperties("FAMILY_DISCOUNT", {
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
                updateDiscountProperties("FAMILY_DISCOUNT", {
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
