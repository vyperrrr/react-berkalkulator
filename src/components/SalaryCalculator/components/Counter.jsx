import { Flex, IconButton, Badge } from "@radix-ui/themes";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

const Counter = ({ value, setValue }) => {
  function decrement() {
    setValue((prevValue) => prevValue - 1);
  }

  function increment() {
    setValue((prevValue) => prevValue + 1);
  }

  return (
    <Flex gap="2" direction="row" align="center">
      <IconButton onClick={decrement}>
        <MinusIcon width="18" height="18" />
      </IconButton>
      <Badge radius="small">{value}</Badge>
      <IconButton onClick={increment}>
        <PlusIcon width="18" height="18" />
      </IconButton>
    </Flex>
  );
};

export default Counter;
