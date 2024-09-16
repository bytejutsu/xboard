import React from "react";
import dataJson from "@assets/svg/autodraw.json";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import "./styles.scss";
import useToggleMode from "@Hooks/useToggleMode";
import { useSelector } from "react-redux";
import { getBrushTypeSelector } from "@Store/draw/selectors";
import { BRUSH_TYPE } from "../../drawcore/TBoardDraw";
import { CloseIcon } from "@assets/svg";
import { convertTransformMatrix, getImageScaleValue } from "@utils/position";

const API_ENDPOINT =
  "https://inputtools.google.com/request?ime=handwriting&app=autodraw&dbg=1&cs=1&oe=UTF-8";

function AutoDrawHandler({ canvas }, ref) {
  const [loading, setLoading] = React.useState(false);
  const [listShape, setListShape] = React.useState([]);
  const { toggleViewMode, setToPencil } = useToggleMode();
  const brushType = useSelector(getBrushTypeSelector);

  const handleFetch = async (shapes) => {
    try {
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({
          input_type: 0,
          requests: [
            {
              language: "autodraw",
              writing_guide: {
                width: 1000,
                height: 1000,
              },
              ink: shapes,
            },
          ],
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }).then((res) => res.json());
      let data = [];
      let results = JSON.parse(
        res[1][0][3].debug_info.match(/SCORESINKS: (.*) Service_Recognize:/)[1]
      ).map((result) => {
        return {
          name: result[0],
          icons: (dataJson[result[0]] || [])?.forEach((collection) => {
            data.push(collection.src);
          }),
        };
      });

      setListShape(data);
    } catch (err) {
      console.log("FETCH SHAPE ERR", err);
    } finally {
      setLoading(false);
    }
  };

  const onItemPress = (item) => {
    toggleViewMode();
    fabric.loadSVGFromURL(item, function (object, option) {
      const vp = canvas.current.canvas.viewportTransform;
      const { zoom } = convertTransformMatrix(vp);
      let shape = fabric.util.groupSVGElements(object, option);
      let scale = getImageScaleValue(
        shape.width * zoom,
        shape.height * zoom,
        4
      );
      shape.scale(scale);

      shape.shapeData = {
        id: `autodraw-${uuidv4()}`,
      };

      const obj = canvas.current.canvas.getActiveObject();
      if (obj) {
        canvas.current.canvas.remove(obj);
      }

      canvas.current.centerObjectByViewPort(shape);
      canvas.current.canvas.add(shape);
      canvas.current.canvas.setActiveObject(shape);
      canvas.current.canvas.requestRenderAll();
    });
  };
  React.useImperativeHandle(ref, () => ({
    getNewShape: handleFetch,
  }));
  if (brushType === BRUSH_TYPE.AUTO_DRAW) {
    return (
      <div className="shape-sugesstion__container">
        <div className="header">
          <span className="header__title">Suggestions</span>
          <div
            className="close-btn"
            onClick={() => {
              setListShape([]);
              setToPencil();
            }}
          >
            <CloseIcon />
          </div>
        </div>
        <div className="shape-sugesstion__list">
          {!listShape.length ? (
            <p className="empty-text">Empty!</p>
          ) : (
            listShape.map((item) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => onItemPress(item)}
                className="shape-btn"
              >
                <img src={item} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    );
  }
  return null;
}

export default React.forwardRef(AutoDrawHandler);
