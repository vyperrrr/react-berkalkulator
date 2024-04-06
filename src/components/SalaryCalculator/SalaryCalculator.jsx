import {
  Flex,
  Text,
  Button,
  Heading,
  IconButton,
  Strong,
} from "@radix-ui/themes";

import { TrashIcon } from "@radix-ui/react-icons";

import MemberDataForm from "./components/MemberDataForm";
import SalarySlider from "./components/SalarySlider";
import PercentageGroup from "./components/PercentageGroup";
import Discounts from "./components/Discounts/Discounts";

import MemberContext from "../../store/MemberContext";
import { useContext } from "react";

import numberFormatter from "../../utils/numberFormatter";
import { calculateNetSalary } from "../../utils/salaryCalculations";

const SalaryCalculator = () => {
  const { selectedMember, setName, setSalary, removeMember } =
    useContext(MemberContext);

  const { id, name, salary } = selectedMember;

  const memberNetSalary = numberFormatter(calculateNetSalary(selectedMember));

  return (
    <Flex direction="column" className="h-full w-full" gapY="3">
      <Flex justify="between" align="center">
        <Heading size="4" className="uppercase">
          {name} bérének kiszámítása
        </Heading>
        <IconButton onClick={() => removeMember(selectedMember.id)}>
          <TrashIcon width="18" height="18" />
        </IconButton>
      </Flex>
      <MemberDataForm
        memberId={id}
        name={name}
        salary={salary}
        setName={setName}
        setSalary={setSalary}
      />
      <SalarySlider memberId={id} salary={salary} setSalary={setSalary} />
      <PercentageGroup
        memberId={id}
        salary={salary}
        setSalary={setSalary}
        size="2"
        variant="soft"
      />
      <Discounts />
      <Flex direction="column" gapY="2">
        <Text size="3">
          <Strong>Számított nettó bér</Strong>
        </Text>
        <Button variant="outline">{memberNetSalary}</Button>
      </Flex>
    </Flex>
  );
};

export default SalaryCalculator;
