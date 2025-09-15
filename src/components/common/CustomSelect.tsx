import { InputLabel, MenuItem, Select } from "@mui/material";

interface OptionType {
  value: string;
  label: string;
}

const CustomSelect = ({
  customLabel,
  customValue,
  onChangeFunc,
  options,
}: {
  customLabel: string;
  customValue: string;
  onChangeFunc: (value: string) => void;
  options: OptionType[];
}) => {
  return (
    <div className="customSelect__container">
      <InputLabel id="custom-select-label">{customLabel}</InputLabel>
      <Select
        labelId="custom-select-label"
        value={customValue}
        label={customLabel}
        onChange={(e) => {
          if (onChangeFunc) {
            onChangeFunc(e.target.value);
          }
        }}
        sx={{
          mb: 5,
        }}
      >
        {options.map((option) => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default CustomSelect;
