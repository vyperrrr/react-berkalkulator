import { TextField, Text } from "@radix-ui/themes";

const LabeledInput = ({
  label,
  size,
  warningLabel,
  isWarningEnabled,
  children,
  ...props
}) => {
  return (
    <>
      {label && <Text size={size}>{label}</Text>}
      <TextField.Root size={size} {...props}>
        {children}
      </TextField.Root>
      {isWarningEnabled && (
        <Text size={size > 2 ? size - 2 + "" : "1"}>{warningLabel}</Text>
      )}
    </>
  );
};

export default LabeledInput;
