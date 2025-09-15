import colours from "@/config/colours";
import "./styles/loadingSpinner.scss";

const LoadingSpinner = ({
  width = "4.5rem",
  height = "4.5rem",
  fillColor = colours.white,
  size = 8,
}: {
  width?: string;
  height?: string;
  fillColor?: string;
  size?: number;
}) => {
  return (
    <div
      style={{ height, width }}
      data-testid="spinner_wrapper"
      className="loadingSpinner"
      role="progressbar"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${size * 4} ${size * 4}`}
        width={size * 4}
        height={size * 4}
        fill={fillColor}
      >
        <circle transform={`translate(${size} 0)`} cx="0" cy={size * 2} r="0">
          <animate
            attributeName="r"
            values={`0; ${size / 2}; 0; 0`}
            dur="1.2s"
            repeatCount="indefinite"
            begin="0"
            keyTimes="0;0.2;0.7;1"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
            calcMode="spline"
          />
        </circle>
        <circle
          transform={`translate(${size * 2} 0)`}
          cx="0"
          cy={size * 2}
          r="0"
        >
          <animate
            attributeName="r"
            values={`0; ${size / 2}; 0; 0`}
            dur="1.2s"
            repeatCount="indefinite"
            begin="0.3"
            keyTimes="0;0.2;0.7;1"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
            calcMode="spline"
          />
        </circle>
        <circle
          transform={`translate(${size * 3} 0)`}
          cx="0"
          cy={size * 2}
          r="0"
        >
          <animate
            attributeName="r"
            values={`0; ${size / 2}; 0; 0`}
            dur="1.2s"
            repeatCount="indefinite"
            begin="0.6"
            keyTimes="0;0.2;0.7;1"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
            calcMode="spline"
          />
        </circle>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
