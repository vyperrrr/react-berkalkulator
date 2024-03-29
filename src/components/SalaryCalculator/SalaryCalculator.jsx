import {
  Flex,
  TextField,
  Text,
  Slider,
  Button,
  Heading,
  Badge,
  IconButton,
  Box,
  Strong,
} from "@radix-ui/themes";

import { TrashIcon } from "@radix-ui/react-icons";

import LabeledInput from "./components/LabeledInput";
import PercentageGroup from "./components/PercentageGroup";
import LabeledSwitch from "./components/LabeledSwitch";
import Counter from "./components/Counter";

import { useState } from "react";

const SalaryCalculator = () => {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");

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
      <Flex direction="column" gap="2">
        <LabeledSwitch
          label="25 év alattiak SZJA mentessége"
          labelSize="2"
          size="1"
          defaultChecked
          radius="small"
        />
        <Flex gap="2" direction="row" wrap="wrap">
          <LabeledSwitch
            label="Friss házasok kedvezménye"
            labelSize="2"
            size="1"
            defaultChecked
            radius="small"
          />
          <Badge color="bronze">Dátum módosítása</Badge>
          <Badge color="crimson">Nem jogosult</Badge>
          <Badge color="green">Jogosult</Badge>
        </Flex>
        <LabeledSwitch
          label="Személyi adókedvezmény"
          labelSize="2"
          size="1"
          defaultChecked
          radius="small"
        />
        <Box className="space-y-2">
          <LabeledSwitch
            label="Családi kedvezmény"
            labelSize="2"
            size="1"
            defaultChecked
            radius="small"
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
      <Text size="3">
        <Strong>Számított nettó bér</Strong>
      </Text>
      <Button variant="outline">130.000 Ft</Button>
    </Flex>
  );
};

export default SalaryCalculator;
