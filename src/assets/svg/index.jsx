import logo from '/src/assets/logo.svg';
export const StrokeWidthSlider = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 146.75 45">
      <path
        class="cls-1"
        d="M6 22.77l118.7-9.67a9.7 9.7 0 1 1 1.58 19.34 10.47 10.47 0 0 1-1.58 0z"
        fill="#333"
      />
    </svg>
  );
};
export const PencilPreview = ({
  color = "#000",
  strokeWidth = 3,
  strokeDasharray,
  height = 70,
}) => {
  return (
    <svg
      width="218"
      height={height}
      viewBox="0 0 218 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.40234 25.8995C48.1828 46.8995 34.817 20.8995 69.9023 10.8995C104.988 0.899481 110.835 41.8995 142.579 36.8995C174.323 31.8995 192.701 -4.10055 216.927 2.89945"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={strokeDasharray}
      />
    </svg>
  );
};

export const LogoIcon = ({ width = 154, height = 32, ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 154 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <g clipPath="url(#clip0_160_2939)">
      <path
        d="M32 14.0228L9.82719 4.41284C7.69489 3.4889 5.3092 3.63715 5.3092 6.02112V11.3286C5.3092 12.0715 5.88666 13.0782 6.87093 13.504L22.2624 20.1784C23.0726 20.5301 23.8 21.2058 23.8 22.2521V25.3618L3.38203 16.5171C1.3997 15.657 0 14.409 0 12.1008V4.23702C0 1.76514 1.62551 0 4.23529 0H27.7613C30.2676 0 31.9966 1.79961 31.9983 4.23702V14.0228H32Z"
        fill="white"
      />
      <path
        d="M0 17.9757L22.1728 27.5857C24.3051 28.5096 26.6908 28.3613 26.6908 25.9774V20.6699C26.6908 19.927 26.1133 18.9203 25.1308 18.4945L9.73928 11.8184C8.92911 11.4667 8.20168 10.791 8.20168 9.74639V6.63672L28.618 15.4814C30.602 16.3398 32 17.5878 32 19.8977V27.7615C32 30.2334 30.3745 31.9985 27.7647 31.9985H4.23874C1.73239 31.9985 0.00172377 30.1972 0 27.7615V17.9757Z"
        fill="#FFF3E4"
      />
    </g>
    <g clipPath="url(#clip1_160_2939)">
      <path
        d="M49.7188 27.6797C43.875 27.6797 40.25 25.1797 40.0156 20.7266L40 20.4297H46.0938L46.125 20.5703C46.3906 21.7891 47.9219 22.6016 49.7969 22.6016C51.7812 22.6016 53 21.7891 53 20.6641V20.6484C53 19.5859 52.0938 19.1484 49.5938 18.6953L47.3281 18.2891C42.8438 17.4922 40.3906 15.2266 40.3906 11.7266V11.7109C40.3906 7.17969 44.2969 4.32031 49.6406 4.32031C55.6719 4.32031 58.875 7.00781 59.0625 11.2266L59.0781 11.5703H52.9844L52.9688 11.4141C52.8438 10.1797 51.5312 9.39844 49.7188 9.39844C47.9062 9.39844 46.9531 10.1953 46.9531 11.2266V11.2422C46.9531 12.2578 47.9219 12.7422 50.1719 13.1484L52.4375 13.5547C57.2656 14.4297 59.5625 16.3984 59.5625 20.0547V20.0703C59.5625 24.7266 55.9375 27.6797 49.7188 27.6797Z"
        fill="#FFF3E4"
      />
      <path
        d="M62.0312 27.2734V4.72656H73.1094C77.7656 4.72656 80.4844 6.85156 80.4844 10.4141V10.4453C80.4844 13.0547 78.4688 15.0234 75.8438 15.3516V15.4766C78.875 15.5547 81.4375 17.8047 81.4375 20.7422V20.7734C81.4375 24.6953 78.3125 27.2734 73.4844 27.2734H62.0312ZM71.3125 9.25781H68.6562V13.8516H71.0312C73.0156 13.8516 74.0469 12.9609 74.0469 11.4922V11.4609C74.0469 10.1016 73 9.25781 71.3125 9.25781ZM71.3438 17.8359H68.6562V22.7422H71.4844C73.5156 22.7422 74.6875 21.8672 74.6875 20.2891V20.2578C74.6875 18.7109 73.5312 17.8359 71.3438 17.8359Z"
        fill="white"
      />
      <path
        d="M91.8906 27.6484C86.2344 27.6484 82.8281 24.3984 82.8281 18.6641V18.6328C82.8281 13.0078 86.3594 9.64844 91.8906 9.64844C97.4219 9.64844 100.969 12.9609 100.969 18.6328V18.6641C100.969 24.4141 97.5312 27.6484 91.8906 27.6484ZM91.9062 22.8984C93.5 22.8984 94.4688 21.3828 94.4688 18.6641V18.6328C94.4688 15.9609 93.4531 14.3984 91.8906 14.3984C90.3281 14.3984 89.3281 15.9609 89.3281 18.6328V18.6641C89.3281 21.3984 90.2812 22.8984 91.9062 22.8984Z"
        fill="white"
      />
      <path
        d="M108.172 27.4922C104.688 27.4922 102.312 25.2422 102.312 22.2734V22.2578C102.312 18.9297 104.875 17.1016 109.469 16.7891L113.094 16.5547V15.8516C113.094 14.8516 112.453 14.2266 111.141 14.2266C109.828 14.2266 109.094 14.8047 108.953 15.5078L108.922 15.6641H103.203L103.219 15.4609C103.484 11.9453 106.469 9.64844 111.5 9.64844C116.531 9.64844 119.5 12.0391 119.5 15.5391V27.2734H113.094V24.9297H112.969C112 26.5703 110.391 27.4922 108.172 27.4922ZM108.562 21.8047C108.562 22.7109 109.328 23.1953 110.516 23.1953C112.047 23.1953 113.094 22.3516 113.094 21.2109V20.1172L110.531 20.3047C109.172 20.3984 108.562 20.9297 108.562 21.7891V21.8047Z"
        fill="white"
      />
      <path
        d="M121.922 27.2734V10.0234H128.328V13.1172H128.453C128.891 10.8672 130.219 9.64844 132.281 9.64844C132.828 9.64844 133.344 9.72656 133.828 9.89844V15.2891C133.281 15.0547 132.625 14.9297 131.969 14.9297C129.562 14.9297 128.328 16.1484 128.328 18.5547V27.2734H121.922Z"
        fill="white"
      />
      <path
        d="M141.344 27.6484C137.062 27.6484 134.609 24.3984 134.609 18.6484V18.6328C134.609 12.8516 137.031 9.64844 141.375 9.64844C143.844 9.64844 145.688 10.9453 146.5 13.1328H146.625V4.72656H153.031V27.2734H146.625V24.3203H146.5C145.719 26.3984 143.844 27.6484 141.344 27.6484ZM143.859 22.4922C145.547 22.4922 146.625 21.0703 146.625 18.6641V18.6484C146.625 16.2266 145.531 14.8047 143.859 14.8047C142.188 14.8047 141.109 16.2266 141.109 18.6328V18.6484C141.109 21.0234 142.188 22.4922 143.859 22.4922Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_160_2939">
        <rect width={32} height={32} fill="white" />
      </clipPath>
      <clipPath id="clip1_160_2939">
        <rect
          width={113.031}
          height={23.3594}
          fill="white"
          transform="translate(40 4.32031)"
        />
      </clipPath>
    </defs>
  </svg>
);

export const PlusOutlineIcon = ({ width = 20, height = 20, ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <g clipPath="url(#clip0_160_5349)">
      <path
        d="M10.8307 5.83268H9.16406V9.16602H5.83073V10.8327H9.16406V14.166H10.8307V10.8327H14.1641V9.16602H10.8307V5.83268ZM9.9974 1.66602C5.3974 1.66602 1.66406 5.39935 1.66406 9.99935C1.66406 14.5993 5.3974 18.3327 9.9974 18.3327C14.5974 18.3327 18.3307 14.5993 18.3307 9.99935C18.3307 5.39935 14.5974 1.66602 9.9974 1.66602ZM9.9974 16.666C6.3224 16.666 3.33073 13.6743 3.33073 9.99935C3.33073 6.32435 6.3224 3.33268 9.9974 3.33268C13.6724 3.33268 16.6641 6.32435 16.6641 9.99935C16.6641 13.6743 13.6724 16.666 9.9974 16.666Z"
        fill="#64646D"
      />
    </g>
    <defs>
      <clipPath id="clip0_160_5349">
        <rect width={20} height={20} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const FolderDownloadOutlineIcon = ({
  width = 20,
  height = 20,
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <g clipPath="url(#clip0_160_5354)">
      <path
        d="M16.6641 5.00065H9.9974L8.33073 3.33398H3.33073C2.41406 3.33398 1.66406 4.08398 1.66406 5.00065V15.0007C1.66406 15.9173 2.41406 16.6673 3.33073 16.6673H16.6641C17.5807 16.6673 18.3307 15.9173 18.3307 15.0007V6.66732C18.3307 5.75065 17.5807 5.00065 16.6641 5.00065ZM16.6641 15.0007H3.33073V5.00065H7.63906L9.30573 6.66732H16.6641V15.0007Z"
        fill="#64646D"
      />
      <path
        d="M15.6667 10.5L12.3333 13.8333L9 10.5H11.5V8L13.1667 8V10.5H15.6667Z"
        fill="#64646D"
      />
    </g>
    <defs>
      <clipPath id="clip0_160_5354">
        <rect width={20} height={20} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const FolderExportPJNG = ({ width = 20, height = 20, ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <g clipPath="url(#clip0_160_5360)">
      <path
        d="M9.9974 6.66667L6.66406 10L9.16406 10L9.16406 17.5L10.8307 17.5L10.8307 10L13.3307 10L9.9974 6.66667ZM2.4974 17.5L7.4974 17.5L7.4974 15.8417L2.4974 15.8417L2.4974 4.15L17.4974 4.15L17.4974 15.8417L12.4974 15.8417L12.4974 17.5L17.4974 17.5C18.4141 17.5 19.1641 16.75 19.1641 15.8333L19.1641 4.16667C19.1641 3.25 18.4141 2.5 17.4974 2.5L2.4974 2.5C1.58073 2.5 0.830732 3.25 0.830732 4.16667L0.830731 15.8333C0.830731 16.75 1.58073 17.5 2.4974 17.5ZM9.9974 6.66667L6.66406 10L9.16406 10L9.16406 17.5L10.8307 17.5L10.8307 10L13.3307 10L9.9974 6.66667ZM2.4974 17.5L7.4974 17.5L7.4974 15.8417L2.4974 15.8417L2.4974 4.15L17.4974 4.15L17.4974 15.8417L12.4974 15.8417L12.4974 17.5L17.4974 17.5C18.4141 17.5 19.1641 16.75 19.1641 15.8333L19.1641 4.16667C19.1641 3.25 18.4141 2.5 17.4974 2.5L2.4974 2.5C1.58073 2.5 0.830732 3.25 0.830732 4.16667L0.830731 15.8333C0.830731 16.75 1.58073 17.5 2.4974 17.5Z"
        fill="#64646D"
      />
    </g>
    <defs>
      <clipPath id="clip0_160_5360">
        <rect
          width={20}
          height={20}
          fill="white"
          transform="translate(20 20) rotate(-180)"
        />
      </clipPath>
    </defs>
  </svg>
);

export const CloseAppIcon = ({ width = 20, height = 20, ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <g clipPath="url(#clip0_160_5365)">
      <path
        d="M11.6641 4.16602H18.3307V5.83268H11.6641V4.16602ZM11.6641 8.74935H18.3307V10.416H11.6641V8.74935ZM11.6641 13.3327H18.3307V14.9993H11.6641V13.3327ZM1.66406 9.58268C1.66406 12.566 4.0974 14.9993 7.08073 14.9993H7.4974V16.666L9.9974 14.166L7.4974 11.666V13.3327H7.08073C5.01406 13.3327 3.33073 11.6493 3.33073 9.58268C3.33073 7.51602 5.01406 5.83268 7.08073 5.83268H9.9974V4.16602H7.08073C4.0974 4.16602 1.66406 6.59935 1.66406 9.58268Z"
        fill="#64646D"
      />
    </g>
    <defs>
      <clipPath id="clip0_160_5365">
        <rect width={20} height={20} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const PenIcon = ({ width = 24, height = 24, ...rest }) => (
  <svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    className="icon-3CqDw icon_large-2wsCL"
    {...rest}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={2}
      stroke="currentColor"
      d="M13.4097 2.80282L19 18.1762V24C19 24.5523 18.5523 25 18 25H6C5.44771 25 5 24.5523 5 24V18.1762L10.5903 2.80282C11.069 1.48631 12.931 1.4863 13.4097 2.80282Z"
    />
    <path
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={2}
      stroke="currentColor"
      d="M8.57141 9H15.4286"
    />
  </svg>
);

export const HighLighterIcon = ({ width = 24, height = 24, ...rest }) => (
  <svg
    fill="none"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    role="presentation"
    focusable="false"
    {...rest}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={2}
      stroke="currentColor"
      d="M18 13V14H19H19.1479C19.6705 14 20.1049 14.4023 20.145 14.9233L20.9201 25L3.07988 25L3.85501 14.9233C3.89508 14.4023 4.32953 14 4.85206 14H5H6V13V11.0002C6 10.4467 6.44716 10.0001 6.99837 10.0001H6.9984L17.0017 10.0001H17.0017C17.5529 10.0001 18 10.4467 18 11.0001V13Z"
    />
    <path
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={2}
      stroke="currentColor"
      d="M8 9C8 9.55228 8.44772 10 9 10H15C15.5523 10 16 9.55228 16 9V3.43961C16 2.80856 15.4227 2.33527 14.8039 2.45903L8.80389 3.65903C8.33646 3.75251 8 4.16293 8 4.63961V9Z"
    />
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      d="M17 13V15H7V13H17Z"
    />
  </svg>
);

export const EraserIcon = ({ width = 24, height = 24, ...rest }) => (
  <svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="presentation"
    focusable="false"
    {...rest}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      d="M6.32843 20L5.62132 20.7071L5.91421 21L6.32843 21L6.32843 20ZM11.9853 20L11.9853 21H11.9853V20ZM17.6421 21C18.1944 21 18.6421 20.5523 18.6421 20C18.6421 19.4477 18.1944 19 17.6421 19V21ZM17.6421 14.3431L18.3492 15.0503L18.3492 15.0503L17.6421 14.3431ZM3.5 14.3431L4.20711 15.0503L3.5 14.3431ZM20.4706 8.68629L19.7635 9.3934L19.7635 9.3934L20.4706 8.68629ZM20.4706 11.5147L19.7635 10.8076L19.7635 10.8076L20.4706 11.5147ZM16.2279 4.44365L16.935 3.73654L16.935 3.73654L16.2279 4.44365ZM13.3995 4.44365L12.6924 3.73654L12.6924 3.73654L13.3995 4.44365ZM15.5208 5.15076L19.7635 9.3934L21.1777 7.97919L16.935 3.73654L15.5208 5.15076ZM7.03553 19.2929L4.20711 16.4645L2.79289 17.8787L5.62132 20.7071L7.03553 19.2929ZM11.9853 19L6.32843 19L6.32843 21L11.9853 21L11.9853 19ZM11.9853 21H17.6421V19H11.9853V21ZM4.20711 15.0503L11.2782 7.97918L9.86396 6.56497L2.79289 13.636L4.20711 15.0503ZM11.2782 7.97918L14.1066 5.15076L12.6924 3.73654L9.86396 6.56497L11.2782 7.97918ZM19.7635 10.8076L16.935 13.636L18.3492 15.0503L21.1777 12.2218L19.7635 10.8076ZM16.935 13.636L11.2782 19.2929L12.6924 20.7071L18.3492 15.0503L16.935 13.636ZM9.86396 7.97918L16.935 15.0503L18.3492 13.636L11.2782 6.56497L9.86396 7.97918ZM4.20711 16.4645C3.81658 16.0739 3.81658 15.4408 4.20711 15.0503L2.79289 13.636C1.62132 14.8076 1.62132 16.7071 2.79289 17.8787L4.20711 16.4645ZM19.7635 9.3934C20.154 9.78392 20.154 10.4171 19.7635 10.8076L21.1777 12.2218C22.3492 11.0503 22.3492 9.15076 21.1777 7.97918L19.7635 9.3934ZM16.935 3.73654C15.7635 2.56497 13.864 2.56497 12.6924 3.73654L14.1066 5.15076C14.4971 4.76023 15.1303 4.76023 15.5208 5.15076L16.935 3.73654Z"
    />
  </svg>
);

export const Lasso = ({ width = 24, height = 24, ...rest }) => (
  <svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    role="presentation"
    focusable="false"
    {...rest}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      strokeDasharray="0.2 3"
      strokeLinecap="round"
      strokeWidth={2}
      stroke="currentColor"
      d="M16 14C16 14 13.5 16 10.5129 16C7.27713 16 2 14.8049 2 10.1951C2 5.58536 6.88283 2 12.5107 2C18.1385 2 22 5 22 9C22 13 20.2156 15.8922 16 18C12 20 11.5118 19.5 10.0135 23"
    />
  </svg>
);

export const UndoIcon = ({ width = 24, height = 24, ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    role="presentation"
    focusable="false"
    {...rest}
  >
    <g
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={2}
      strokeLinecap="round"
      stroke="currentColor"
      fillRule="evenodd"
      fill="none"
    >
      <path d="M5 14.5C8.5 8 17.5 8 20 15M9.018 15H4l.018-5" />
    </g>
  </svg>
);

export const RedoIcon = ({ width = 24, height = 24, ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    role="presentation"
    focusable="false"
    {...rest}
  >
    <g
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={2}
      strokeLinecap="round"
      stroke="currentColor"
      fillRule="evenodd"
      fill="none"
    >
      <path d="M19 14.5C15.5 8 6.5 8 4 15M14.982 15H20l-.018-5" />
    </g>
  </svg>
);

export const FrameIcon = ({ width = 24, height = 24, ...rest }) => (
  <svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    role="presentation"
    focusable="false"
    {...rest}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      d="M4 4V8H20V4H4ZM4 20V10H8V20H4ZM10 20H20V10H10V20ZM3 2C2.44772 2 2 2.44772 2 3V21C2 21.5523 2.44772 22 3 22H21C21.5523 22 22 21.5523 22 21V3C22 2.44772 21.5523 2 21 2H3Z"
      clipRule="evenodd"
      fillRule="evenodd"
    />
  </svg>
);

export const TIcon = ({ width = 24, height = 24, ...rest }) => (
  <svg
    width={width}
    height={height}
    fill="currentColor"
    viewBox="0 0 24 24"
    role="presentation"
    focusable="false"
    {...rest}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V7C21 7.55228 20.5523 8 20 8C19.4477 8 19 7.55228 19 7V5H13V19H15C15.5523 19 16 19.4477 16 20C16 20.5523 15.5523 21 15 21H9C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19H11V5H5V7C5 7.55228 4.55228 8 4 8C3.44772 8 3 7.55228 3 7V5Z"
      fill="currentColor"
    />
  </svg>
);

export const NoteIcon = ({ width = 24, height = 24, ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M4 4V20H13V15C13 14.4696 13.2107 13.9609 13.5858 13.5858C13.9609 13.2107 14.4696 13 15 13H20V4H4ZM4 2H20C20.5304 2 21.0391 2.21071 21.4142 2.58579C21.7893 2.96086 22 3.46957 22 4V14.172C21.9999 14.7024 21.7891 15.211 21.414 15.586L15.586 21.414C15.211 21.7891 14.7024 21.9999 14.172 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2Z"
      fill="currentColor"
    />
  </svg>
);

export const ShapeIcon = ({ width = 24, height = 24, ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.5 14C18.5376 14 21 11.5376 21 8.5C21 5.46243 18.5376 3 15.5 3C12.4624 3 10 5.46243 10 8.5C10 8.66854 10.0076 8.83532 10.0224 9H14C14.5523 9 15 9.44771 15 10V13.9776C15.1647 13.9924 15.3315 14 15.5 14ZM15 15.9836V21C15 21.5523 14.5523 22 14 22H3C2.44772 22 2 21.5523 2 21V10C2 9.44771 2.44772 9 3 9H8.0164C8.00552 8.83474 8 8.66801 8 8.5C8 4.35786 11.3579 1 15.5 1C19.6421 1 23 4.35786 23 8.5C23 12.6421 19.6421 16 15.5 16C15.332 16 15.1653 15.9945 15 15.9836ZM4 20V11H13V20H4Z"
      fill="currentColor"
    />
  </svg>
);

export const PlusFilledIcon = ({ width = 24, height = 24, ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 2.4C0 1.76348 0.252856 1.15303 0.702944 0.702944C1.15303 0.252856 1.76348 0 2.4 0H21.6C22.2365 0 22.847 0.252856 23.2971 0.702944C23.7471 1.15303 24 1.76348 24 2.4V21.6C24 22.2365 23.7471 22.847 23.2971 23.2971C22.847 23.7471 22.2365 24 21.6 24H2.4C1.76348 24 1.15303 23.7471 0.702944 23.2971C0.252856 22.847 0 22.2365 0 21.6V2.4ZM10.8 7.2C10.8 6.88174 10.9264 6.57652 11.1515 6.35147C11.3765 6.12643 11.6817 6 12 6C12.3183 6 12.6235 6.12643 12.8485 6.35147C13.0736 6.57652 13.2 6.88174 13.2 7.2V10.8H16.8C17.1183 10.8 17.4235 10.9264 17.6485 11.1515C17.8736 11.3765 18 11.6817 18 12C18 12.3183 17.8736 12.6235 17.6485 12.8485C17.4235 13.0736 17.1183 13.2 16.8 13.2H13.2V16.8C13.2 17.1183 13.0736 17.4235 12.8485 17.6485C12.6235 17.8736 12.3183 18 12 18C11.6817 18 11.3765 17.8736 11.1515 17.6485C10.9264 17.4235 10.8 17.1183 10.8 16.8V13.2H7.2C6.88174 13.2 6.57652 13.0736 6.35147 12.8485C6.12643 12.6235 6 12.3183 6 12C6 11.6817 6.12643 11.3765 6.35147 11.1515C6.57652 10.9264 6.88174 10.8 7.2 10.8H10.8V7.2Z"
      fill="currentColor"
    />
  </svg>
);
export const CloseIcon = () => {
  return (
    <svg viewBox="0 0 24 24">
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M10.586 12l-6.293 6.293a1 1 0 0 0 1.414 1.414L12 13.414l6.293 6.293a1 1 0 0 0 1.414-1.414L13.414 12l6.293-6.293a1 1 0 1 0-1.414-1.414L12 10.586 5.707 4.293a1 1 0 0 0-1.414 1.414L10.586 12z"
        fillRule="nonzero"
        fill="currentColor"
      ></path>
    </svg>
  );
};
export const SettingIcon = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        fill="none"
        d="M13.5442 3h-3l-1 3-1.4461.835-3.0981-.634-1.5 2.598 2.098 2.3661.0001 1.6698-2.098 2.366 1.5 2.5981 3.098-.634 1.4461.835 1 3h3l1-3 1.4462-.8349 3.0981.6339 1.5-2.598-2.0981-2.3661v-1.6699l2.0981-2.366-1.5-2.598-3.0981.634-1.4462-.835-1-3Z"
      ></path>
      <path
        stroke="currentColor"
        strokeWidth="2"
        d="M11.8097 12.3875v.0001"
        fill="none"
      ></path>
    </svg>
  );
};
export const LockedIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      focusable="false"
      data-testid="svg-icon"
    >
      <path
        d="M12 17a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        fill="currentColor"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v4a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3h8V5a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4H7V5Zm0 6a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1H7Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
export const UnLockedIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
    >
      <path
        d="M12 17a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        fill="currentColor"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v4a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3h8V5a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2 1 1 0 0 1-2 0Zm0 6a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1H7Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
export const MathIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 18L14 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 18L20 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 5H12.0979C12.0384 5 11.9845 5.03517 11.9606 5.08964L6.41504 17.7058C6.36379 17.8224 6.19971 17.8261 6.14326 17.7119L3.46987 12.3057C3.44458 12.2546 3.39246 12.2222 3.33541 12.2222H2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CircleQuestionIcon = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 20 20"
    fill="none"
    className="bg"
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
    focusable="false"
    {...props}
  >
    <path
      d="M8.333 7.917A1.667 1.667 0 1 1 10 9.583a.833.833 0 0 0-.834.834v.833a.833.833 0 0 0 1.667 0v-.417c1.438-.37 2.5-1.363 2.5-2.916a3.333 3.333 0 0 0-6.667 0 .833.833 0 0 0 1.667 0ZM10 15.417a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
      fill="white"
    />
  </svg>
);

export const PlusIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="presentation"
    focusable="false"
    {...props}
  >
    <path
      fill="currentColor"
      d="M18 13h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5V6a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2z"
    />
  </svg>
);

export const MinusIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="presentation"
    focusable="false"
    {...props}
  >
    <path fill="currentColor" d="M18 13H6a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2z" />
  </svg>
);
export const ImageIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 4H3C1.9 4 1 4.9 1 6V18C1 19.1 1.9 20 3 20H21C22.1 20 23 19.1 23 18V6C23 4.9 22.1 4 21 4ZM21 18H3V6H21V18ZM14.5 11L11 15.51L8.5 12.5L5 17H19L14.5 11Z"
        fill="currentColor"
      />
    </svg>
  );
};
export const ExportIcon = () => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_397_21238"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="25"
        height="24"
      >
        <path d="M0.773438 0H24.7734V24H0.773438V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_397_21238)">
        <path
          d="M21.7734 13V19C21.7734 19.5523 21.3257 20 20.7734 20H4.77344C4.22114 20 3.77344 19.5523 3.77344 19V13M12.7734 14V3M12.7734 3L16.7734 7.5M12.7734 3L8.77344 7.5"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
export const MainLogo = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%'}}>
      <img
        width="115"
        height="40"
        src={logo} alt="logo"
      />
      <span style={{fontWeight: 'bold'}}>xBoard</span>
    </div>
  );
};
export const AutoDrawIcon = () => {
  return (
    <svg fill="none" viewBox="0 0 24 24" role="presentation" focusable="false">
      <path
        xmlns="http://www.w3.org/2000/svg"
        strokeLinecap="round"
        strokeWidth="2"
        stroke="currentColor"
        d="M6.96634 6.04882C8.41498 4.08186 12.6676 3.66484 14.2339 6.49158C14.8788 7.65549 15.0924 8.85652 14.9648 10M6.96634 2C2.40569 4.08184 0.0361121 10.1946 4.04603 14.3115C5.97841 16.0409 8.12127 16.3018 10 15.7215"
      ></path>
      <rect
        xmlns="http://www.w3.org/2000/svg"
        strokeWidth="2"
        stroke="currentColor"
        transform="rotate(-180 21 21)"
        rx="1"
        height="11"
        width="11"
        y="21"
        x="21"
      ></rect>
      <path
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        d="M20.5 0L21.1713 1.702C21.3745 2.21744 21.7826 2.62545 22.298 2.82874L24 3.5L22.298 4.17126C21.7826 4.37455 21.3745 4.78256 21.1713 5.298L20.5 7L19.8287 5.298C19.6255 4.78256 19.2174 4.37455 18.702 4.17126L17 3.5L18.702 2.82874C19.2174 2.62545 19.6255 2.21744 19.8287 1.702L20.5 0Z"
      ></path>
    </svg>
  );
};

export const FitContentIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="presentation"
    focusable="false"
    {...props}
  >
    <g fill="none" fillRule="evenodd" stroke="currentColor" strokeWidth={2}>
      <path d="M2 6v12V6zm20 0v12V6zM6 12h12" />
      <path strokeLinecap="round" d="m8 9-3 3 3 3m8-6 3 3-3 3" />
    </g>
  </svg>
);

export const UpMiniIcon = (props) => (
  <svg
    width={10}
    height={5}
    viewBox="0 0 10 5"
    role="presentation"
    focusable="false"
    {...props}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M5 0l5 5H0z"
      fillRule="evenodd"
      fill="currentColor"
    />
  </svg>
);

export const DownMiniIcon = (props) => (
  <svg
    width={10}
    height={5}
    viewBox="0 0 10 5"
    role="presentation"
    focusable="false"
    {...props}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M5 5l5-5H0z"
      fillRule="evenodd"
      fill="currentColor"
    />
  </svg>
);

export const AIcon = (props) => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    role="presentation"
    focusable="false"
    style={{
      width: 14,
      height: 14,
    }}
    {...props}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M6 0 .5 14h2.25l1.12-3h6.25l1.12 3h2.25L8 0H6ZM4.62 9 7 2.67 9.38 9H4.62Z"
      fillRule="evenodd"
      fill="currentColor"
    />
  </svg>
);

export const HighLightITextIcon = (props) => (
  <svg
    width={17}
    height={15}
    viewBox="0 0 17 15"
    role="presentation"
    focusable="false"
    {...props}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M.5 14.168l1.945-1.945-.495-1.91L8.814 3.45l4.242 4.242-6.864 6.864-1.909-.495-.938.939H.5v-.832zm13.263-7.183L9.521 2.743 11.849.414a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.329 2.328z"
      fillRule="evenodd"
      fill="currentColor"
    />
  </svg>
);

export const MoreIcon = (props) => (
  <svg
    width={16}
    height={4}
    viewBox="0 0 16 4"
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
    focusable="false"
    {...props}
  >
    <path
      d="M2 0C.9 0 0 .9 0 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM8 0C6.9 0 6 .9 6 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
export const TrashIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.7714 10.885L12.5 13.1228L10.2179 10.885L8.70714 12.3733L10.9893 14.6111L8.71786 16.8489L10.2286 18.3372L12.5 16.0994L14.7714 18.3372L16.2821 16.8489L14.0107 14.6111L16.2821 12.3733L14.7714 10.885ZM16.25 4.05556L15.1786 3H9.82143L8.75 4.05556H5V6.16667H20V4.05556H16.25ZM6.07143 19.8889C6.07143 21.05 7.03571 22 8.21429 22H16.7857C17.9643 22 18.9286 21.05 18.9286 19.8889V7.22222H6.07143V19.8889ZM8.21429 9.33333H16.7857V19.8889H8.21429V9.33333Z"
        fill="currentColor"
      />
    </svg>
  );
};
