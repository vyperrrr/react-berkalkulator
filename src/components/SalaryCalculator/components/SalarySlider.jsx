import { Slider } from "@radix-ui/themes";

const SalarySlider = ({ memberId, salary, setSalary }) => {
  const handleChange = (newValue) => {
    setSalary(memberId, parseInt(newValue));
  };

  return (
    <Slider
      value={[salary]}
      onValueChange={handleChange}
      min={0}
      step={100}
      max={2000000}
      variant="soft"
      radius="small"
    />
  );
};

export default SalarySlider;
