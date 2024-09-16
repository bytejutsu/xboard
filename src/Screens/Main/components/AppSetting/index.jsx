import React, { useState } from "react";
//
import "./styles.scss";
import { Select } from "antd";

import PENCIL from "@assets/images/pen1.png";
import ERASER from "@assets/images/pen2.png";
import SELECT from "@assets/images/pen4.png";
import PICK_IMAGE from "@assets/images/pick-image.png";
import CLEAR_PAGE from "@assets/images/clean.png";
import MATH from "@assets/images/math.png";
import SHAPE from "@assets/images/shape.png";
import APP_SETTING from "@assets/images/app-setting.png";
import EYE from "@assets/images/eye.png";
import ADD_BOARD from "@assets/images/new-page.png";
import COLOR from "@assets/images/color-picker.png";
import DOCS from "@assets/images/docs.png";
import SGK from "@assets/images/sgk.png";
import RULER from "@assets/images/ruler.png";
import VIDEO from "@assets/images/video.png";
import ADD_TEXT from "@assets/images/add-text.png";
import CHART from "@assets/images/chart.png";
import RECORD from "@assets/images/record.png";
import TEXT_DOCS from "@assets/images/msoffice.png";
import FILE from "@assets/images/file.png";
import logo from "@assets/images/logo.png";

import {
  CUSTOM_EXPORT_FIELD,
  SECRET_KEY,
  TOOLBAR_ELEMENTS,
} from "../../constants";
import { getToolToShowSelector } from "@Store/board/selectors";
import { useDispatch, useSelector, useStore } from "react-redux";
import { setToolToShow } from "@Store/board";
import { getIsShowSettingSelector } from "@Store/draw/selectors";
import { setIsShowSetting } from "@Store/draw";
import CryptoJS from "crypto-js";
import useBoardManager from "@Hooks/useBoardManager";
export const LIST_TAB = [
  {
    id: "lang",
    label: "Đổi ngôn ngữ",
  },
  {
    id: "toolbar",
    label: "Thanh công cụ",
  },
  {
    id: "save",
    label: "Lưu file",
  },
  {
    id: "owner",
    label: "Thông tin nhà sản xuất",
  },
  {
    id: "exit",
    label: "Thoát phần mềm",
  },
];
const LANGS = [
  {
    value: "vi-VN",
    label: "Tiếng Việt",
  },
  {
    value: "en-US",
    label: "Tiếng Anh",
  },
];
const LanguagePicker = () => {
  const [lang, setLang] = useState("vi-VN");
  return (
    <div>
      <div className="tab-title">Lựa chọn ngôn ngữ</div>
      <Select
        defaultValue={lang}
        style={{ width: 200, marginTop: 10 }}
        options={LANGS}
      />
    </div>
  );
};
const ToolbarPicker = () => {
  const dispatch = useDispatch();
  const toolToShow = useSelector(getToolToShowSelector);

  const getIsActive = (id) => toolToShow?.some((ele) => ele?.id === id);

  const onItemClick = (item) => {
    if (!getIsActive(item?.id)) {
      dispatch(setToolToShow([...toolToShow, item]));
    } else {
      dispatch(
        setToolToShow([...toolToShow].filter((ele) => item.id !== ele.id))
      );
    }
  };

  const renderImage = (id) => {
    switch (id) {
      case "PENCIL":
        return <img src={PENCIL} />;
      case "ERASER":
        return <img src={ERASER} />;
      case "SELECT":
        return <img src={SELECT} />;
      case "AUTO_DRAW":
        return <img src={SELECT} />;
      case "IMAGE":
        return <img src={PICK_IMAGE} />;
      case "CLEAR_PAGE":
        return <img src={CLEAR_PAGE} />;
      case "SHAPE":
        return <img src={SHAPE} />;
      case "MATH":
        return <img src={MATH} />;
      case "ADD_BOARD":
        return <img src={ADD_BOARD} />;
      case "COLOR":
        return <img src={COLOR} />;
      case "RULER":
        return <img src={RULER} />;
      case "SGK":
        return <img src={SGK} />;
      case "DOCS":
        return <img src={DOCS} />;
      case "VIDEO":
        return <img src={VIDEO} />;

      case "ADD_TEXT":
        return <img src={ADD_TEXT} />;
      case "RECORD":
        return <img src={RECORD} />;
      case "TEXT_DOCS":
        return <img src={TEXT_DOCS} />;
      case "CHART":
        return <img src={CHART} />;
      case "FILE":
        return <img src={FILE} />;
      case "RED":
        return (
          <div className="color-img" style={{ backgroundColor: "red" }}></div>
        );
      case "GREEN":
        return (
          <div className="color-img" style={{ backgroundColor: "green" }}></div>
        );
      case "BLUE":
        return (
          <div className="color-img" style={{ backgroundColor: "blue" }}></div>
        );
      default:
        return null;
    }
  };
  return (
    <div className="d-flex flex-column w-100">
      <div className="tab-title">
        Lựa chọn các tính năng hiển thị trên thanh công cụ
      </div>
      <div className="list-tool__wrap">
        {TOOLBAR_ELEMENTS.map((item) => {
          return (
            <div
              key={item?.id}
              onClick={() => onItemClick(item)}
              className="list-tool__item d-flex flex-row align-items-center"
            >
              <div
                className={
                  "check-box " + (getIsActive(item?.id) ? "active" : "")
                }
              >
                <svg
                  width="11"
                  height="8"
                  viewBox="0 0 11 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.00195312 3.49805C0.00195312 3.36133 0.0507812 3.24414 0.148438 3.14648C0.246094 3.04883 0.363281 3 0.5 3C0.636719 3 0.753906 3.04883 0.851562 3.14648L3.5 5.79492L9.14844 0.146484C9.24609 0.0488281 9.36328 0 9.5 0C9.57031 0 9.63477 0.0136719 9.69336 0.0410156C9.75586 0.0644531 9.80859 0.0996094 9.85156 0.146484C9.89844 0.189453 9.93555 0.242187 9.96289 0.304688C9.99023 0.363281 10.0039 0.427734 10.0039 0.498047C10.0039 0.634766 9.95312 0.753906 9.85156 0.855469L3.85156 6.85547C3.75391 6.95312 3.63672 7.00195 3.5 7.00195C3.36328 7.00195 3.24609 6.95312 3.14844 6.85547L0.148438 3.85547C0.0507812 3.75781 0.00195312 3.63867 0.00195312 3.49805Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="item-image">{renderImage(item.id)}</div>
              <div className="item-name">{item.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const Information = () => {
  return (
    <div>
      <div className="tab-title">Thông tin về nhà sản xuất</div>
      <img src={logo} style={{ width: "30%", height: "auto", marginTop: 20 }} />
      <div className="info-content">
        Lorem Ipsum is simply dummy text of the printing and typesetting Lorem
        Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book
      </div>
    </div>
  );
};

export default function AppSetting({ canvas }) {
  const store = useStore();
  const dispatch = useDispatch();
  const isShowSetting = useSelector(getIsShowSettingSelector);
  const [activeTab, setActiveTab] = useState(LIST_TAB[0]);
  const { saveBoardCanvas } = useBoardManager();

  const handleClose = () => {};
  const renderTab = React.useMemo(() => {
    switch (activeTab.id) {
      case "lang":
        return <LanguagePicker />;
      case "toolbar":
        return <ToolbarPicker />;
      case "owner":
        return <Information />;
      default:
        return null;
    }
  }, [activeTab]);

  const toggleShow = () => dispatch(setIsShowSetting(!isShowSetting));

  const handleSaveFile = () => {
    saveBoardCanvas(canvas.current?.canvas?.toJSON(CUSTOM_EXPORT_FIELD));
    const listBoard = store.getState().board?.listBoard;
    const currentBoardId = store.getState().board?.currentBoardId;
    let json = { listBoard, currentBoardId };
    let ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(json),
      SECRET_KEY
    ).toString();
    const blob = new Blob([ciphertext], { type: "text/plain" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = Date.now() + "_TBOARD" + ".draw";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className={"app-setting__container " + (isShowSetting ? "show" : "")}>
      <div className="header">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.7462 11.9472C14.7462 13.4812 13.5188 14.7499 12 14.7499C10.4812 14.7499 9.24512 13.4812 9.24512 11.9472C9.24512 10.4132 10.4812 9.24988 12 9.24988C13.5188 9.24988 14.7462 10.4132 14.7462 11.9472Z"
            stroke="#121219"
            strokeWidth="2"
          />
          <path
            d="M14.2127 4.04115L13.5749 2.5962C13.4149 2.23381 13.0562 2 12.66 2H11.3151C10.919 2 10.5602 2.23381 10.4003 2.5962L9.7625 4.04115C9.14903 5.43103 7.70895 6.26643 6.19788 6.10901L4.39332 5.92102C4.00234 5.88029 3.62377 6.07239 3.42579 6.41199L2.83283 7.42909C2.63099 7.77531 2.65534 8.2086 2.89471 8.53002L3.92975 9.91989C4.84991 11.1555 4.85394 12.8475 3.93967 14.0875L2.89016 15.5108C2.65335 15.832 2.63015 16.2632 2.83113 16.608L3.42295 17.6231C3.62238 17.9652 4.00486 18.1573 4.39835 18.1132L6.17891 17.9134C7.69885 17.7429 9.15349 18.5791 9.77109 19.9783L10.4003 21.4038C10.5602 21.7662 10.919 22 11.3151 22H12.66C13.0562 22 13.4149 21.7662 13.5749 21.4038L14.2041 19.9783C14.8217 18.5791 16.2763 17.7429 17.7963 17.9134L19.5829 18.1139C19.9733 18.1577 20.3531 17.9688 20.5539 17.6312L21.1632 16.6064C21.3676 16.2627 21.3476 15.8304 21.1124 15.5071L20.0664 14.069C19.1701 12.8368 19.174 11.1661 20.0762 9.93811L21.1079 8.53379C21.3456 8.2102 21.3667 7.77581 21.1615 7.43068L20.5511 6.40395C20.3518 6.06875 19.9758 5.87998 19.5879 5.92039L17.7773 6.10901C16.2662 6.26643 14.8261 5.43103 14.2127 4.04115Z"
            stroke="#121219"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
        </svg>
        <div onClick={toggleShow} className="close-btn">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 15L1 1"
              stroke="#121219"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M15 1L1 15"
              stroke="#121219"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      <div className="content">
        <div className="tab-list">
          {LIST_TAB.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.id === "exit") {
                  handleClose();
                  return;
                }
                if (item.id === "save") {
                  handleSaveFile();
                  return;
                }
                setActiveTab(item);
              }}
              className={
                "tab-item " + (item.id === activeTab?.id ? "active" : "")
              }
            >
              {item.label}
            </div>
          ))}
        </div>
        <div className="tab-content">{renderTab}</div>
      </div>
    </div>
  );
}
