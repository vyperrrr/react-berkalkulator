import {
  Flex,
  TextField,
  Text,
  Slider,
  Button,
  Heading,
  IconButton,
  Strong,
} from "@radix-ui/themes";

import { TrashIcon } from "@radix-ui/react-icons";

import LabeledInput from "./components/LabeledInput";
import PercentageGroup from "./components/PercentageGroup";
import Discounts from "./components/Discounts";

import { useState } from "react";

const SalaryCalculator = () => {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");

  const [discounts, setDiscounts] = useState({
    under25: { discount: 0, isActive: false },
    taxDiscount: { discount: 0, isActive: false },
    familyDiscount: { discount: 0, isActive: false },
    freshMerried: { discount: 0, isActive: false },
  });

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleSalaryChange(event) {
    const value = event.target.value;
    if (value === "") {
      setSalary(value);
    } else if (!isNaN(value) && !value.includes("e")) {
      setSalary(+value);
    }
  }

  const percentages = ["-1", "-5", "+1", "+5"];

  function handleSalaryPercentageChange(event) {
    if (salary === "") return;
    setSalary((prevSalary) => {
      const percentage = event.target.value / 100;
      return prevSalary + prevSalary * percentage;
    });
  }

  function handleSalarySliderChange(newValue) {
    setSalary(+newValue);
  }

  return (
    <Flex direction="column" gap="2" className="relative">
      <IconButton className="absolute right-0">
        <TrashIcon width="18" height="18" />
      </IconButton>
      <Heading size="4" className="uppercase">
        {name} bérének kiszámítása
      </Heading>
      <LabeledInput
        label={"Családtag neve"}
        size={"3"}
        value={name}
        onChange={handleNameChange}
        warningLabel={"Add meg a családtag nevét!"}
        isWarningEnabled={name === ""}
      />
      <LabeledInput
        label={"Bruttó bér"}
        size={"3"}
        value={salary}
        onChange={handleSalaryChange}
        warningLabel={"Add meg a bruttó béredet!"}
        isWarningEnabled={salary === ""}
      >
        <TextField.Slot side="right">Ft</TextField.Slot>
      </LabeledInput>
      <Slider
        defaultValue={[0]}
        onValueChange={handleSalarySliderChange}
        min={0}
        step={1000}
        max={500000}
        variant="soft"
        radius="small"
      />
      <PercentageGroup
        size="2"
        variant="soft"
        values={percentages}
        onClick={handleSalaryPercentageChange}
      />
      <Heading size="3">Kedvezmények</Heading>
      <Discounts discounts={discounts} setDiscounts={setDiscounts} />
      <Text size="3">
        <Strong>Számított nettó bér</Strong>
      </Text>
      <Button variant="outline">130.000 Ft</Button>
    </Flex>
  );
};

export default SalaryCalculator;
