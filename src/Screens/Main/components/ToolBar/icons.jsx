export const CursorPointerIcon = ({ width = 24, height = 24, ...rest }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" {...rest}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M7 19l4.394-2.59 1.86 4.661a1 1 0 0 0 1.3.558l.499-.2a1 1 0 0 0 .557-1.3l-1.86-4.66L18.5 14 7 2v17z"
        fillRule="evenodd"
        fill="currentColor"
      />
    </svg>
  );
};
export const EyeIcon = () => {
  return (
    <svg
      width="60"
      height="68"
      viewBox="0 0 60 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_iii_423_1898)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M55.2173 29.9999C51.4714 21.2387 41.8005 14.9999 30.4608 14.9999C19.121 14.9999 9.45004 21.2388 5.7042 30.0001C9.4501 38.7612 19.121 45.0001 30.4607 45.0001C41.8005 45.0001 51.4714 38.7611 55.2173 29.9999Z"
          fill="#005FB8"
        />
      </g>
      <g filter="url(#filter1_dd_423_1898)">
        <circle
          cx="11"
          cy="11"
          r="11"
          transform="matrix(-1 0 0 1 41.2173 19)"
          fill="white"
        />
      </g>
      <g filter="url(#filter2_ii_423_1898)">
        <circle
          cx="7"
          cy="7"
          r="7"
          transform="matrix(-1 0 0 1 37.2173 23)"
          fill="#005FB8"
        />
      </g>
      <defs>
        <filter
          id="filter0_iii_423_1898"
          x="-10.2959"
          y="12"
          width="90.5132"
          height="44.0002"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="25" dy="11" />
          <feGaussianBlur stdDeviation="15" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_423_1898"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-19" dy="-3" />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_423_1898"
            result="effect2_innerShadow_423_1898"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="7" dy="3" />
          <feGaussianBlur stdDeviation="5.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_innerShadow_423_1898"
            result="effect3_innerShadow_423_1898"
          />
        </filter>
        <filter
          id="filter1_dd_423_1898"
          x="1.21729"
          y="10"
          width="58"
          height="58"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.37 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_423_1898"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="9" />
          <feGaussianBlur stdDeviation="9" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.37 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_423_1898"
            result="effect2_dropShadow_423_1898"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_423_1898"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_ii_423_1898"
          x="20.2173"
          y="21"
          width="21"
          height="16"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="4" dy="-2" />
          <feGaussianBlur stdDeviation="6" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_423_1898"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-3" />
          <feGaussianBlur stdDeviation="5.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_423_1898"
            result="effect2_innerShadow_423_1898"
          />
        </filter>
      </defs>
    </svg>
  );
};
