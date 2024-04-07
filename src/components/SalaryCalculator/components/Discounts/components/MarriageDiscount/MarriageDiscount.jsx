import { useState, useRef } from "react";
import { Badge, Box, Flex, Text, Callout, Button } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";

import dayjs from "dayjs";

import LabeledInput from "@/components/SalaryCalculator/components/LabeledInput";
import LabeledSwitch from "@/components/SalaryCalculator/components/LabeledSwitch";
import Modal from "@/components/Modal/Modal";
import Eligiblity from "./components/Eligibility";

import {
  validateDate,
  isDateWithinTwoYearsFromNow,
  isDateNextMonthBeforeNow,
} from "@/utils/dateUtils";

let isEligibleForMarriageDiscount = false;

const MarriageDiscount = ({ discounts, handleDiscountChange }) => {
  const dateRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [isInvalidDate, setIsInvalidDate] = useState(false);

  function handleDateChange() {
    const date = dateRef.current.value;
    if (!validateDate(date)) {
      handleDiscountChange("freshMerried", true, { isEligible: false });
      setIsInvalidDate(true);
      return;
    }

    handleDiscountChange("freshMerried", true, { isEligible: true });
    setIsOpen(false);
    setIsInvalidDate(false);
    setDate(date);
  }

  function isEligibleForDiscount() {
    const marriageDate = dayjs(date);

    return (
      isDateWithinTwoYearsFromNow(marriageDate) &&
      isDateNextMonthBeforeNow(marriageDate)
    );
  }

  function handleModalClose() {
    setIsOpen(false);
    setIsInvalidDate(false);
  }

  if (date != null) isEligibleForMarriageDiscount = isEligibleForDiscount();

  return (
    <Flex gap="2" direction="row" wrap="wrap">
      <LabeledSwitch
        label="Friss házasok kedvezménye"
        labelSize="2"
        size="1"
        radius="small"
        checked={discounts.freshMerried.isActive}
        onCheckedChange={(isChecked) =>
          handleDiscountChange("freshMerried", isChecked, {
            isEligible: isEligibleForMarriageDiscount,
          })
        }
      />
      {discounts.freshMerried.isActive && (
        <>
          <Badge className="cursor-pointer" onClick={() => setIsOpen(true)}>
            Dátum módosítása
          </Badge>
          <Modal
            title="Dátum módosítása"
            description="A kedvezmény először a házasságkötést követő hónapra vehető igénybe
            és a házassági életközösség alatt legfeljebb 24 hónapon keresztül
            jár."
            isOpen={isOpen}
            setIsOpen={handleModalClose}
          >
            <Box className="space-y-2">
              <LabeledInput
                label="Adja meg a házasságkötés dátumát:"
                placeholder="YYYY/MM/DD"
                ref={dateRef}
              />
              {isInvalidDate && (
                <Text size="1" color="red">
                  A megadott dátum nem érvényes.
                </Text>
              )}
              <Callout.Root size="1" variant="soft">
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>Például: 2003/09/17</Callout.Text>
              </Callout.Root>
              <Flex mt="2" gap="2" justify="end">
                <Button variant="soft" color="gray" onClick={handleModalClose}>
                  Cancel
                </Button>
                <Button variant="solid" onClick={handleDateChange}>
                  Mentés
                </Button>
              </Flex>
            </Box>
          </Modal>
          <Eligiblity isEligible={isEligibleForMarriageDiscount} />
        </>
      )}
    </Flex>
  );
};

export default MarriageDiscount;
