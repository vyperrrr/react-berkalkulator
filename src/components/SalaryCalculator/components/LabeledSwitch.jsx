import { Text, Flex, Switch } from "@radix-ui/themes";

const LabeledSwitch = ({ label, labelSize, ...props }) => {
  return (
    <Text as="label" size={labelSize}>
      <Flex gap="2">
        <Switch {...props} /> {label}
      </Flex>
    </Text>
  );
};

export default LabeledSwitch;
