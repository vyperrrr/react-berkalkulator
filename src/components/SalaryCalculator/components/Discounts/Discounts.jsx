import { Flex, Heading } from "@radix-ui/themes";

import LabeledSwitch from "../LabeledSwitch";
import MarriageDiscount from "./components/MarriageDiscount/MarriageDiscount";
import FamilyDiscount from "./components/FamilyDiscount/FamilyDiscount";

import MemberContext from "/src/store/MemberContext";
import { useContext } from "react";

const Discounts = () => {
  const { selectedMember, setDiscounts } = useContext(MemberContext);

  const { id, discounts } = selectedMember;

  function updateDiscountProperties(discount, updatedProperties) {
    const updatedDiscounts = {
      ...discounts,
      [discount]: { ...discounts[discount], ...updatedProperties },
    };
    setDiscounts(id, updatedDiscounts);
  }

  return (
    <Flex direction="column" gapY="2">
      <Heading size="3">Kedvezmények</Heading>
      <LabeledSwitch
        label="25 év alattiak SZJA mentessége (499 952 Ft-ig)"
        labelSize="2"
        size="1"
        radius="small"
        checked={discounts.UNDER_TWENTY_FIVE_DISCOUNT.isActive}
        onCheckedChange={(isChecked) =>
          updateDiscountProperties("UNDER_TWENTY_FIVE_DISCOUNT", {
            isActive: isChecked,
          })
        }
      />
      <LabeledSwitch
        label="Személyi adókedvezmény"
        labelSize="2"
        size="1"
        radius="small"
        checked={discounts.TAX_DISCOUNT.isActive}
        onCheckedChange={(isChecked) =>
          updateDiscountProperties("TAX_DISCOUNT", {
            isActive: isChecked,
          })
        }
      />
      <MarriageDiscount
        discounts={discounts}
        updateDiscountProperties={updateDiscountProperties}
      />
      <FamilyDiscount
        discounts={discounts}
        updateDiscountProperties={updateDiscountProperties}
      />
    </Flex>
  );
};

export default Discounts;
