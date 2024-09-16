import "./styled.scss";

import React from "react";

// @Svg
import {
  FolderDownloadOutlineIcon,
  LogoIcon,
  PlusOutlineIcon,
  FolderExportPJNG,
  MoreIcon,
  CloseAppIcon,
} from "@/assets/svg";

// @Components
import Switch from "@Components/Switch";
import Dropdown from "antd/es/dropdown";
import Space from "antd/es/space";

const Header = () => {
  const items = [
    {
      key: 1,
      label: "Tạo mới",
      icon: <PlusOutlineIcon />,
    },
    {
      key: 2,
      label: "Lưu",
      icon: <FolderDownloadOutlineIcon />,
    },
    {
      key: 3,
      label: "Lưu dưới pjng",
      icon: <FolderExportPJNG />,
    },
    {
      key: 4,
      label: "Đóng ứng dụng",
      icon: <CloseAppIcon />,
    },
  ];

  return (
    <header className="header-container">
      <LogoIcon />
      <Space size={8}>
        <Switch />
        <Dropdown menu={{ items }} trigger={["click"]}>
          <MoreIcon style={{ cursor: "pointer" }} />
        </Dropdown>
      </Space>
    </header>
  );
};

export default Header;
