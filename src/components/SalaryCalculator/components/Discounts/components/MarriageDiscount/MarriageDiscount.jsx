import { useState, useRef } from "react";
import { Badge, Box, Flex, Text, Callout, Button } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";

import dayjs from "dayjs";

import LabeledInput from "../../../LabeledInput";
import LabeledSwitch from "../../../LabeledSwitch";
import Modal from "../../../../../Modal/Modal";
import Eligiblity from "./components/Eligibility";

let isEligibleForMarriageDiscount = false;

const MarriageDiscount = ({ discounts, handleDiscountChange }) => {
  const dateRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [isInvalidDate, setIsInvalidDate] = useState(false);

  function handleDateChange() {
    const date = dateRef.current.value;
    if (!validateDate(date)) {
      setIsInvalidDate(true);
      return;
    }

    setIsOpen(false);
    setIsInvalidDate(false);
    setDate(date);
  }

  function validateDate(date) {
    const marriageDate = dayjs(date);
    if (!marriageDate.isValid()) return false;
    if (marriageDate.isAfter(dayjs())) return false;

    return true;
  }

  function handleModalClose() {
    setIsOpen(false);
    setIsInvalidDate(false);
  }

  function isMarriageDateWithinTwoYears(marriageDate) {
    const now = dayjs();
    const diffYears = now.diff(marriageDate, "year");
    return diffYears <= 2;
  }

  function isMarriageDateNextMonthBeforeNow(marriageDate) {
    const now = dayjs();
    const marriageDateNextMonth = marriageDate.add(1, "month").startOf("month");
    return now.isAfter(marriageDateNextMonth);
  }

  function checkIfEligibleForMarriageDiscount() {
    const marriageDate = dayjs(date);

    return (
      isMarriageDateWithinTwoYears(marriageDate) &&
      isMarriageDateNextMonthBeforeNow(marriageDate)
    );
  }

  if (date != null)
    isEligibleForMarriageDiscount = checkIfEligibleForMarriageDiscount();

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
          <Badge
            color="bronze"
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
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
