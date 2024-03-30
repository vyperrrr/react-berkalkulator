import {
  Flex,
  Box,
  Badge,
  Text,
  Callout,
  Button,
  Dialog,
} from "@radix-ui/themes";

import LabeledSwitch from "./LabeledSwitch";
import Counter from "./Counter";
import Modal from "../../Modal/Modal";
import LabeledInput from "./LabeledInput";

import { InfoCircledIcon } from "@radix-ui/react-icons";

const Discounts = ({ discounts, setDiscounts }) => {
  function handleDiscountChange(type, isChecked) {
    setDiscounts((prevDiscounts) => ({
      ...prevDiscounts,
      [type]: { discount: prevDiscounts[type].discount, isActive: isChecked },
    }));
  }

  function handleDateChange() {}

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
              description="A kedvezmény először a házasságkötést követő hónapra vehető igénybe és a házassági életközösség alatt legfeljebb 24 hónapon keresztül jár."
            >
              <Box className="space-y-2">
                <LabeledInput
                  label="Adja meg a házasságkötés dátumát"
                  placeholder="YYYY/MM/DD"
                />
                <Callout.Root size="1" variant="soft">
                  <Callout.Icon>
                    <InfoCircledIcon />
                  </Callout.Icon>
                  <Callout.Text>Például: 2003/09/17</Callout.Text>
                </Callout.Root>
                <Flex mt="2" gap="2" justify="end">
                  <Dialog.Close>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </Dialog.Close>
                  <Dialog.Close>
                    <Button variant="solid" onClick={handleDateChange}>
                      Mentés
                    </Button>
                  </Dialog.Close>
                </Flex>
              </Box>
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
