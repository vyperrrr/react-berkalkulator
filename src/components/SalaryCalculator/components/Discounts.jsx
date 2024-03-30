import { Flex, Box, Badge, Text } from "@radix-ui/themes";

import LabeledSwitch from "./LabeledSwitch";
import Counter from "./Counter";
import Modal from "../../Modal/Modal";

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
      <Flex gap="2" direction="row" wrap="wrap">
        <LabeledSwitch
          label="Friss házasok kedvezménye"
          labelSize="2"
          size="1"
          radius="small"
          checked={discounts.freshMerried.isActive}
          onCheckedChange={(isChecked) =>
            handleDiscountChange("freshMerried", isChecked)
          }
        />
        {discounts.freshMerried.isActive && (
          <>
            <Modal
              TriggerElement={
                <Badge color="bronze" className="cursor-pointer">
                  Dátum módosítása
                </Badge>
              }
              title="Dátum módosítása"
              description="Dátum módosítása"
            >
              <Text size="2">Dátum módosítása</Text>
            </Modal>
            <Badge color="crimson">Nem jogosult</Badge>
            <Badge color="green">Jogosult</Badge>
          </>
        )}
      </Flex>
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
        <Box>
          <Flex gap="2" direction="column">
            <Text size="2">Eltartottak száma</Text>
            <Counter value={0} />
            <Text size="2">Kedvezményezettek száma</Text>
            <Counter value={0} />
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default Discounts;
