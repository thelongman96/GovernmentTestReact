import { Link } from "@mui/material";

const LinkWrapper = ({
  text,
  linkHref,
  testId,
  styles,
  classes,
  underline = true,
  clickHandler,
}: {
  text: string;
  linkHref?: string;
  testId?: string;
  styles?: object;
  classes?: Array<string>;
  underline?: boolean;
  clickHandler?: () => void;
}) => {
  return (
    <Link
      {...(clickHandler !== undefined && { onClick: clickHandler })}
      {...(linkHref !== undefined && { href: linkHref })}
      data-testid={testId}
      sx={{ ...styles, cursor: "pointer" }}
      underline={!underline ? "none" : "always"}
      className={classes?.join(" ")}
    >
      {text}
    </Link>
  );
};

export default LinkWrapper;
