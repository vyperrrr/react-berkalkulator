import { Flex, Heading } from "@radix-ui/themes";

import LabeledSwitch from "../LabeledSwitch";
import MarriageDiscount from "./components/MarriageDiscount/MarriageDiscount";
import FamilyDiscount from "./components/FamilyDiscount/FamilyDiscount";

import MemberContext from "../../../../store/MemberContext";
import { useContext } from "react";

const Discounts = () => {
  const { selectedMember, setDiscounts } = useContext(MemberContext);

  const { id, discounts } = selectedMember;

  function handleDiscountChange(type, isChecked, properties = {}) {
    const updatedDiscounts = {
      ...discounts,
      [type]: { isActive: isChecked, ...properties },
    };
    setDiscounts(id, updatedDiscounts);
  }

  return (
    <Flex direction="column" gap="2">
      <Heading size="3">Kedvezmények</Heading>
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
      <FamilyDiscount
        discounts={discounts}
        handleDiscountChange={handleDiscountChange}
      />
    </Flex>
  );
};

export default Discounts;
