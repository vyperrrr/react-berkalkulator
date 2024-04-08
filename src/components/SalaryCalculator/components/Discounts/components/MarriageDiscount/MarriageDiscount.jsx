import { useState, useRef } from "react";
import { Badge, Box, Flex, Text, Callout, Button } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";

import dayjs from "dayjs";

import LabeledSwitch from "/src/components/SalaryCalculator/components/LabeledSwitch";
import LabeledInput from "/src/components/SalaryCalculator/components/LabeledInput";
import Modal from "/src/components/Modal/Modal";
import Eligiblity from "./components/Eligibility";

import {
  validateDate,
  isDateWithinTwoYearsFromNow,
  isDateNextMonthBeforeNow,
} from "/src/utils/dateUtils";

const MarriageDiscount = ({ discounts, updateDiscountProperties }) => {
  const dateRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isInvalidDate, setIsInvalidDate] = useState(false);

  const handleSubmit = () => {
    const providedDate = dayjs(dateRef.current.value);
    const isValidDate = validateDate(providedDate);
    if (isValidDate) {
      setIsInvalidDate(false);
      updateDiscountProperties("FRESH_MERRIED_DISCOUNT", {
        isEligible: isEligibleForDiscount(providedDate),
      });
      setIsOpen(false);
    } else {
      setIsInvalidDate(true);
      updateDiscountProperties("FRESH_MERRIED_DISCOUNT", {
        isEligible: false,
      });
    }
  };

  const isEligibleForDiscount = (providedDate) => {
    if (providedDate) {
      return (
        isDateNextMonthBeforeNow(providedDate) &&
        isDateWithinTwoYearsFromNow(providedDate)
      );
    }
    return false;
  };

  return (
    <Flex gap="2" direction="row" wrap="wrap">
      <LabeledSwitch
        label="Friss házasok kedvezménye"
        labelSize="2"
        size="1"
        radius="small"
        checked={discounts.FRESH_MERRIED_DISCOUNT.isActive}
        onCheckedChange={(isChecked) =>
          updateDiscountProperties("FRESH_MERRIED_DISCOUNT", {
            isActive: isChecked,
          })
        }
      />
      {discounts.FRESH_MERRIED_DISCOUNT.isActive && (
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
            handleClose={() => setIsOpen(false)}
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
                <Button
                  variant="soft"
                  color="gray"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="solid" onClick={handleSubmit}>
                  Mentés
                </Button>
              </Flex>
            </Box>
          </Modal>
          <Eligiblity
            isEligible={discounts.FRESH_MERRIED_DISCOUNT.isEligible}
          />
        </>
      )}
    </Flex>
  );
};

export default MarriageDiscount;
