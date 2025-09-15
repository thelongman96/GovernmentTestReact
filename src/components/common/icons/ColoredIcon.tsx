import coloredIconData from "./coloredIconData";
import { standardizeIconSize } from "@/utils/commonUtils";
import colours from "@/config/colours";
import { find } from "lodash";

const ColoredIcon = ({
  variant,
  fillColor = colours.black,
  scale = 1,
  dataTip,
  iconContainer,
  iconContainerSize = "50px",
  iconContainerBackgroundColor = colours.white,
}: {
  variant: string;
  fillColor?: string;
  scale?: number;
  hasTooltip?: boolean;
  dataTip?: string;
  iconContainer?: boolean;
  iconContainerSize?: string;
  iconContainerBackgroundColor?: string;
}) => {
  const color = fillColor;

  const { width, height, viewBox, d, transform } =
    find(coloredIconData, (data) => data.iconKey === variant) ?? {};

  const renderSvgIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={standardizeIconSize(Number(width) * scale)}
      height={standardizeIconSize(Number(height) * scale)}
      viewBox={viewBox || `0 0 ${width} ${height}`}
      data-testid={`colored_icon_${variant}`}
      {...(dataTip && {
        "data-tooltip-id": "tooltip",
        "data-tooltip-content": dataTip,
        "data-tooltip-place": "top",
      })}
    >
      <path d={d} transform={transform} fill={color} />
    </svg>
  );

  if (iconContainer) {
    return (
      <div
        style={{
          width: iconContainerSize,
          height: iconContainerSize,
          backgroundColor: iconContainerBackgroundColor,
        }}
        className="coloredIcon__container"
      >
        {renderSvgIcon()}
      </div>
    );
  }

  return renderSvgIcon();
};

export default ColoredIcon;
