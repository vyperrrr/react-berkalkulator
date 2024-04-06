import { Flex, Button } from "@radix-ui/themes";

const percentages = ["-1", "-5", "+1", "+5"];

const PercentageGroup = ({ memberId, salary, setSalary }) => {
  const handleClick = (button) => {
    const newSalary = salary + salary * (button.value / 100);
    setSalary(memberId, newSalary);
  };

  return (
    <Flex direction="row" gap="2" className="items-center justify-center">
      {percentages.map((value) => {
        return (
          <Button
            key={value}
            value={value}
            onClick={(event) => handleClick(event.target)}
          >
            {value}%
          </Button>
        );
      })}
    </Flex>
  );
};

export default PercentageGroup;
