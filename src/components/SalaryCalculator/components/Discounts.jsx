import { Flex, Box, Text } from "@radix-ui/themes";

import LabeledSwitch from "./LabeledSwitch";
import Counter from "./Counter";
import MarriageDiscount from "./MarriageDiscount";

const Discounts = ({ discounts, setDiscounts }) => {
  function handleDiscountChange(type, isChecked) {
    setDiscounts((prevDiscounts) => ({
      ...prevDiscounts,
      [type]: { discount: prevDiscounts[type].discount, isActive: isChecked },
    }));
  }

  console.log(discounts);

  return (
    <Flex direction="column" gap="2">
      <LabeledSwitch
        label="25 év alattiak SZJA mentessége"
        labelSize="2"
        size="1"
        radius="small"
        checked={discounts.under25.isActive}
        onCheckedChange={(isChecked) =>
          handleDiscountChange("under25", isChecked)
        }
      />

      <LabeledSwitch
        label="Személyi adókedvezmény"
        labelSize="2"
        size="1"
        radius="small"
        checked={discounts.taxDiscount.isActive}
        onCheckedChange={(isChecked) =>
          handleDiscountChange("taxDiscount", isChecked)
        }
      />
      <MarriageDiscount
        discounts={discounts}
        handleDiscountChange={handleDiscountChange}
      />
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
              <Counter value={0} />
              <Text size="2">Kedvezményezettek száma</Text>
              <Counter value={0} />
            </Flex>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default Discounts;
