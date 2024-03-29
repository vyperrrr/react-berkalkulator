import { Flex, Button } from "@radix-ui/themes";

const PercentageGroup = ({ values, ...props }) => {
  return (
    <Flex direction="row" gap="2" className="items-center justify-center">
      {values.map((value) => {
        return (
          <Button key={value} value={value} {...props}>
            {value}%
          </Button>
        );
      })}
    </Flex>
  );
};

export default PercentageGroup;
