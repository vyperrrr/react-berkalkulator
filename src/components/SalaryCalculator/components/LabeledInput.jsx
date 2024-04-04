import { TextField, Text } from "@radix-ui/themes";
import { forwardRef } from "react";

const LabeledInput = forwardRef(function LabeledInput(
  { label, size, warningLabel, isWarningEnabled, children, ...props },
  ref,
) {
  return (
    <span>
      {label && <Text size={size}>{label}</Text>}
      <TextField.Root size={size} {...props} ref={ref}>
        {children}
      </TextField.Root>
      {isWarningEnabled && (
        <Text size={size > 2 ? size - 2 + "" : "1"}>{warningLabel}</Text>
      )}
    </span>
  );
});

export default LabeledInput;
