import { useState, useRef } from "react";
import {
  Dialog,
  Badge,
  Box,
  Flex,
  Text,
  Callout,
  Button,
} from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";

import LabeledInput from "./LabeledInput";
import LabeledSwitch from "./LabeledSwitch";
import Eligiblity from "./Eligibility";

const MarriageDiscount = ({ discounts, handleDiscountChange }) => {
  const dateRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [isInvalidDate, setIsInvalidDate] = useState(false);

  function handleDateChange() {
    const date = dateRef.current.value;
    if (!date.match(/\d{4}\/\d{2}\/\d{2}/)) {
      setIsInvalidDate(true);
      return;
    }

    setIsInvalidDate(false);
    setDate(date);
    setIsOpen(false);
  }

  return (
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
          <Dialog.Root open={isOpen}>
            <Dialog.Trigger>
              <Badge
                color="bronze"
                className="cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                Dátum módosítása
              </Badge>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Title>Dátum módosítása</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                A kedvezmény először a házasságkötést követő hónapra vehető
                igénybe és a házassági életközösség alatt legfeljebb 24 hónapon
                keresztül jár.
              </Dialog.Description>
              <Box className="space-y-2">
                <LabeledInput
                  label="Adja meg a házasságkötés dátumát"
                  placeholder="YYYY/MM/DD"
                  ref={dateRef}
                />
                {isInvalidDate && <Text size="1">Hibás dátum formátum</Text>}
                <Callout.Root size="1" variant="soft">
                  <Callout.Icon>
                    <InfoCircledIcon />
                  </Callout.Icon>
                  <Callout.Text>Például: 2003/09/17</Callout.Text>
                </Callout.Root>
                <Flex mt="2" gap="2" justify="end">
                  <Dialog.Close>
                    <Button
                      variant="soft"
                      color="gray"
                      onClick={() => setIsOpen(false)}
                    >
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
            </Dialog.Content>
          </Dialog.Root>
          <Eligiblity isEligible={true} />
        </>
      )}
    </Flex>
  );
};

export default MarriageDiscount;
