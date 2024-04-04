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
import Discounts from "./components/Discounts/Discounts";

import MemberContext from "../../store/MemberContext";

import { useContext } from "react";

const SalaryCalculator = () => {
  const {
    selectedMember,
    setName,
    setSalary,
    removeMember,
    calculateNetSalary,
  } = useContext(MemberContext);

  const { id, name, salary } = selectedMember;

  function handleNameChange(event) {
    setName(selectedMember.id, event.target.value);
  }

  function handleSalaryChange(event) {
    const value = event.target.value;
    if (value === "") {
      setSalary(id, value);
    } else if (!isNaN(value) && !value.includes("e")) {
      setSalary(id, +value);
    }
  }

  const percentages = ["-1", "-5", "+1", "+5"];

  function handleSalaryPercentageChange(event) {
    if (salary === "") return;
    const percentage = event.target.value / 100;
    const newSalary = salary + salary * percentage;
    setSalary(id, newSalary);
  }

  function handleSalarySliderChange(newValue) {
    setSalary(id, +newValue);
  }

  return (
    <Flex direction="column" gap="2" className="relative">
      <IconButton
        className="absolute right-0"
        onClick={() => removeMember(selectedMember.id)}
      >
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
        value={[salary]}
        onValueChange={handleSalarySliderChange}
        min={0}
        step={100}
        max={2000000}
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
      <Discounts />
      <Text size="3">
        <Strong>Számított nettó bér</Strong>
      </Text>
      <Button variant="outline">{calculateNetSalary(selectedMember)}</Button>
    </Flex>
  );
};

export default SalaryCalculator;
