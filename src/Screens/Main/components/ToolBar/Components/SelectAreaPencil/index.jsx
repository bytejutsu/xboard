import React, { useState } from "react";

//COMPONENT
import ButtonIcon from "@/Components/ButtonIcon";

//ASSETES
// import IconImageRotate from "@assets/images/pen4-rotate.png";
// import IconImage from "@assets/images/pen4.png";

import { Lasso } from "@/assets/svg";

export default function SelectAreaPencil({
  onClick = () => {},
  active = false,
  title,
}) {
  return (
    <ButtonIcon title={title} onClick={onClick} active={active}>
      <Lasso />
    </ButtonIcon>
  );
}
