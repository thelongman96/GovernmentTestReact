import { Button, type ButtonProps } from "@mui/material";
import "./styles/customButton.scss";
import LoadingSpinner from "./LoadingSpinner";
import colours from "@/config/colours";

// variants = src/components/common/variants/customButtonVariants.ts

const spinnerColours: { [key: string]: string } = {
  primary: colours.white,
};

const CustomButton = ({
  type = "button",
  variant = "primary",
  buttonText,
  onClickFunc,
  disabled = false,
  classes,
  isLoading = false,
}: {
  type?: ButtonProps["type"];
  variant?: ButtonProps["variant"];
  buttonText: string;
  onClickFunc?: () => void;
  disabled?: boolean;
  classes: Array<string>;
  isLoading: boolean;
}) => {
  return (
    <div className="customButton__container">
      <Button
        type={type}
        variant={variant}
        className="customButton__button"
        classes={classes}
        onClick={onClickFunc}
        loading={isLoading}
        loadingIndicator={
          <LoadingSpinner fillColor={spinnerColours[variant]} />
        }
        disabled={disabled}
        data-testid={`${buttonText}_btn`}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default CustomButton;
