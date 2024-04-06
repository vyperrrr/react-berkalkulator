import { Flex, TextField } from "@radix-ui/themes";

import LabeledInput from "./LabeledInput";

const MemberDataForm = ({ memberId, name, salary, setName, setSalary }) => {
  const handleNameChange = (input) => {
    setName(memberId, input.value);
  };

  const handleSalaryChange = (input) => {
    const value = input.value;
    if (value === "") {
      setSalary(memberId, 0);
    } else if (!isNaN(value) && !value.includes("e")) {
      setSalary(memberId, +value);
    }
  };

  return (
    <Flex direction="column" gapY="3">
      <LabeledInput
        label={"Családtag neve"}
        size={"2"}
        value={name}
        onChange={(event) => handleNameChange(event.target)}
        warningLabel={"Add meg a családtag nevét!"}
        isWarningEnabled={name === ""}
      />
      <LabeledInput
        label={"Bruttó bér"}
        size={"2"}
        value={salary}
        onChange={(event) => handleSalaryChange(event.target)}
        warningLabel={"Add meg a bruttó béredet!"}
        isWarningEnabled={salary === 0}
      >
        <TextField.Slot side="right">Ft</TextField.Slot>
      </LabeledInput>
    </Flex>
  );
};

export default MemberDataForm;
