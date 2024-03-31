import { Flex, IconButton, Badge } from "@radix-ui/themes";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";

/**
 * Counter component.
 *
 * @param {Object} props Component props.
 * @param {number} props.initialCount The initial count.
 * @param {Function} props.setCount Function to set the count. Returns the new count. It should be a state setter function.
 * @param {number} props.min The minimum count.
 * @param {number} props.max The maximum count.
 */
const Counter = ({ initialCount, setCount, min, max }) => {
  useEffect(() => {
    if (initialCount < min || initialCount > max)
      throw new Error(
        "CounterError : initialCount must be in [min, max] range.",
      );
  }, [initialCount, min, max]);

  function decrement() {
    setCount((prevValue) => {
      if (min != null && min >= prevValue) {
        return prevValue;
      }
      return prevValue - 1;
    });
  }

  function increment() {
    setCount((prevValue) => {
      if (max != null && max <= prevValue) {
        return prevValue;
      }
      return prevValue + 1;
    });
  }

  return (
    <Flex gap="2" direction="row" align="center">
      <IconButton onClick={decrement}>
        <MinusIcon width="18" height="18" />
      </IconButton>
      <Badge radius="small">{initialCount}</Badge>
      <IconButton onClick={increment}>
        <PlusIcon width="18" height="18" />
      </IconButton>
    </Flex>
  );
};

export default Counter;
