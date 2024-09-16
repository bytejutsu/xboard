import React, { useState } from "react";
//COMPONENT
import { Popover, Slider } from "antd";
import { AlphaPicker } from "react-color";
import {
  AutoDrawIcon,
  CloseIcon,
  EraserIcon,
  HighLighterIcon,
  Lasso,
  PenIcon,
} from "@assets/svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setBrushType,
  setMarkersConfig,
  setPatternConfig,
  setPencilConfig,
  setBrushColor,
} from "@Store/draw";
import {
  getBrushColorSelector,
  getBrushTypeSelector,
  getMarkersConfigSelector,
  getPatternConfigSelector,
  getPencilConfigSelector,
} from "@Store/draw/selectors";
import { PatternString } from "../../../../constants/patternString";
//ASSETES

import marker from "@assets/images/marker.png";
import pencil from "@assets/images/pencil.png";
import pattern from "@assets/images/pattern.png";

import pattern1 from "@assets/svg/patterns/pattern1.svg";
import pattern2 from "@assets/svg/patterns/pattern2.svg";
import pattern3 from "@assets/svg/patterns/pattern3.svg";
import { BRUSH_TYPE } from "../../../../drawcore/TBoardDraw";
import PenConfigPreview from "./PenConfigPreview";

//motion
import { motion, AnimatePresence } from "framer-motion";
import { PencilConfigPopup } from "..";

const ListImage = [pattern1, pattern2, pattern3];

const PatternTypes = Object.values(PatternString);

const CONFIGS = {
  PENCIL: {
    img: pencil,
    id: "PENCIL",
    name: "Bút chì",
  },
  SPRAY: {
    img: marker,
    id: "SPRAY",
    name: "Bút lông",
  },
  PATTERN: {
    img: pattern,
    id: "PATTERN",
    name: "Bút kết cấu",
  },
};
const DashType = [
  [],
  [5, 5],
  [5, 10],
  [10, 5],
  [5, 1],
  [1, 5],
  [0.9],
  [15, 10, 5],
  [15, 10, 5, 10],
  [15, 10, 5, 10, 15],
  [5, 5, 1, 5],
];

const PencilConfig = ({
  strokeWidth,
  color,
  setShowPencilConfig = () => {},
  showPencilConfig = false,
}) => {
  const [activeOpt, setActiveOpt] = React.useState("opt1");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="divider"></div>

        <PenConfigPreview
          onClick={() => {
            setShowPencilConfig(!showPencilConfig);
          }}
          active={true}
          color={`rgba(${color.r},${color.g},${color.b},${color.a})`}
          width={strokeWidth}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default function ChoosePencilTypeConfigPopup({
  setShowPencilTypeConfig = () => {},
}) {
  const dispatch = useDispatch();
  const markersConfig = useSelector(getMarkersConfigSelector);
  const pencilConfig = useSelector(getPencilConfigSelector);
  const patternConfig = useSelector(getPatternConfigSelector);
  const brushColor = useSelector(getBrushColorSelector);

  const [showPencilConfig, setShowPencilConfig] = useState(false);
  const [activeStroke, setActiveStroke] = useState(0);
  const [activePattern, setActivePattern] = useState(patternConfig?.svg);
  const [opacity, setOpacity] = useState({
    ...brushColor,
    a: markersConfig?.opacity || 1,
  });
  const [strokeWidth, setStrokeWidth] = useState(markersConfig?.width || 10);

  const brushType = useSelector(getBrushTypeSelector);
  const color = `rgba(${opacity.r},${opacity.g},${opacity.b},${opacity.a})`;

  const [activeIcon, setActiveIcon] = React.useState("PENCIL");

  const ListIcon = [
    {
      id: "PENCIL",
      icon: PenIcon,
      isActive: brushType === BRUSH_TYPE.PENCIL,
      onPress: () => {
        changeActiveBrush(BRUSH_TYPE.PENCIL);
        if (activeIcon !== "PENCIL") {
          setActiveIcon("PENCIL");
        }
      },
    },
    {
      id: "HIGHLIGHTER",
      icon: HighLighterIcon,
      isActive: brushType === BRUSH_TYPE.HIGHLIGHTER,
      onPress: () => {
        changeActiveBrush(BRUSH_TYPE.HIGHLIGHTER);
        if (activeIcon !== "HIGHLIGHTER") {
          setActiveIcon("HIGHLIGHTER");
        }
      },
    },
    {
      id: "ERASER",
      icon: EraserIcon,
      isActive: brushType === BRUSH_TYPE.ERASER_GROUP,
      onPress: () => {
        changeActiveBrush(BRUSH_TYPE.ERASER_GROUP);
        if (activeIcon !== "ERASER") {
          setActiveIcon("ERASER");
        }
      },
    },
    {
      id: "SELECTOR",
      icon: Lasso,
      isActive: brushType === BRUSH_TYPE.SELECT,
      onPress: () => {
        changeActiveBrush(BRUSH_TYPE.SELECT);
        if (activeIcon !== "SELECTOR") {
          setActiveIcon("SELECTOR");
        }
      },
    },
    {
      id: "AUTO_DRAW",
      icon: AutoDrawIcon,
      isActive: brushType === BRUSH_TYPE.AUTO_DRAW,
      onPress: () => {
        changeActiveBrush(BRUSH_TYPE.AUTO_DRAW);
        if (activeIcon !== "AUTO_DRAW") {
          setActiveIcon("AUTO_DRAW");
        }
      },
    },
  ];

  const handleChangeConfig = (stroW, opaci, index, id) => {
    if (brushType === BRUSH_TYPE.HIGHLIGHTER) {
      dispatch(
        setMarkersConfig({
          width: stroW,
          opacity: opaci.a,
        })
      );
    } else if (brushType === BRUSH_TYPE.PENCIL) {
      dispatch(
        setPencilConfig({
          width: stroW,
          opacity: opaci.a,
          dashArray: DashType[index],
        })
      );
    } else if (brushType === BRUSH_TYPE.PATTERN) {
      dispatch(
        setPatternConfig({
          width: stroW,
          opacity: opaci.a,
          svg: id,
        })
      );
    }
  };
  const changeActiveBrush = (type) => {
    dispatch(setBrushType(type));
  };

  const initState = () => {
    if (brushType === BRUSH_TYPE.PENCIL) {
      let strokeIndex = !pencilConfig?.dashArray?.length
        ? 0
        : DashType.findIndex(
            (item) =>
              JSON.stringify(item) === JSON.stringify(pencilConfig?.dashArray)
          );
      setActiveStroke(strokeIndex);
      setStrokeWidth(pencilConfig?.width);
      setOpacity({
        ...brushColor,
        a: pencilConfig?.opacity || 1,
      });
    }
    if (brushType === BRUSH_TYPE.HIGHLIGHTER) {
      setStrokeWidth(markersConfig?.width);
      setOpacity({
        ...brushColor,
        a: markersConfig?.opacity || 1,
      });
    }
    if (brushType === BRUSH_TYPE.PATTERN) {
      setStrokeWidth(patternConfig?.width);
      setOpacity({
        ...brushColor,
        a: patternConfig?.opacity || 1,
      });
    }
  };

  React.useEffect(() => {
    initState();
  }, [brushType, brushColor]);
  const isPattern = brushType === BRUSH_TYPE.PATTERN;
  const isPencil = brushType === BRUSH_TYPE.PENCIL;
  const isSpray = brushType === BRUSH_TYPE.HIGHLIGHTER;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pentype-config__popup"
      >
        <div
          className="icon-btn"
          onClick={() => setShowPencilTypeConfig(false)}
        >
          <CloseIcon />
        </div>
        <div className="divider"></div>
        {ListIcon.map((item, index) => (
          <div
            key={item.id}
            className={"icon-btn " + (item.isActive ? "icon-btn--active" : "")}
            onClick={item.onPress}
          >
            <item.icon />
          </div>
        ))}
        {brushType === BRUSH_TYPE.PENCIL ||
        brushType === BRUSH_TYPE.HIGHLIGHTER ? (
          <PencilConfig
            strokeWidth={strokeWidth}
            color={opacity}
            showPencilConfig={showPencilConfig}
            setShowPencilConfig={setShowPencilConfig}
          />
        ) : null}

        {showPencilConfig && (
          <PencilConfigPopup
            onAfterChange={(v) => {
              handleChangeConfig(v, opacity, activeStroke, activePattern);
            }}
            onChange={(v) => setStrokeWidth(v)}
            strokeWidth={strokeWidth}
            color={opacity}
            onChangeColor={(color) => dispatch(setBrushColor(color))}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
