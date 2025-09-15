import { TextField, type InputBaseComponentProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./styles/customTextInput.scss";

const CustomTextInput = ({
  value,
  fieldId,
  fieldLabel,
  fieldType,
  fieldAutoComplete,
  fieldPlaceholder,
  errors,
  onChange,
  onSubmit,
  fullWidth = false,
  customProps,
  sx,
}: {
  value?: string | null;
  fieldId: string;
  fieldLabel?: string;
  fieldType?: string;
  fieldAutoComplete?: string;
  fieldPlaceholder?: string;
  errors?: Array<string>;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  fullWidth?: boolean;
  customProps?: InputBaseComponentProps;
  sx?: object;
}) => {
  const { t } = useTranslation();
  const errorsArray = errors ?? [];
  const onKeyUp = (e: { key: string }) => {
    if (e.key === "Enter" && onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="customTextInput__container">
      <TextField
        fullWidth={fullWidth}
        value={value}
        id={fieldId}
        name={fieldId}
        variant="outlined"
        label={fieldLabel}
        {...(fieldType && { type: fieldType })}
        {...(fieldAutoComplete && {
          autoComplete: fieldAutoComplete,
        })}
        placeholder={fieldPlaceholder}
        error={errorsArray.length > 0}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
        onKeyUp={onKeyUp}
        InputProps={customProps}
        sx={sx}
        helperText={errorsArray.length > 0 ? t(errorsArray[0]) : ""}
      />
    </div>
  );
};

export default CustomTextInput;
