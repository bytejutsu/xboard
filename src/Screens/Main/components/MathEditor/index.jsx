import React, { useState } from "react";
import useFomularField from "@Hooks/useFomularField";
import { useDispatch, useSelector } from "react-redux";
import {
  getGlobalMountedSelector,
  getOpenMathEditorSelector,
} from "@Store/draw/selectors";
import { MathfieldElement } from "mathlive";

import "./styles.scss";
import { setOpenMathEditor } from "@Store/draw";
import { mapCursorPositionToCanvasPosition } from "../../../../utils/position";
import { v4 as uuidv4 } from "uuid";
import useToggleMode from "@Hooks/useToggleMode";

function exToPx(value, scalingPxPerEx, noPixel) {
  var match = value.match(/^(.*)ex$/);
  return match
    ? (parseFloat(match[1]) * scalingPxPerEx).toFixed(3) + (noPixel ? "" : "px")
    : value;
}
const MathEditor = ({ canvas }, ref) => {
  const open = useSelector(getOpenMathEditorSelector);
  const dispatch = useDispatch();
  const mathFieldRef = React.useRef(new MathfieldElement());
  const { toggleViewMode } = useToggleMode();
  const [value, setValue] = useState(null);

  const valueRef = React.useRef();
  const openRef = React.useRef();
  const objectDataCloneRef = React.useRef();
  const objectDataRef = React.useRef();

  const handleCreateNewMath = (value) => {
    console.log("VALUE", value);
    const isUpdate = !!objectDataCloneRef.current;
    if (!value && !isUpdate) {
      return;
    }
    if (!value && isUpdate) {
      try {
        canvas.current?.canvas.remove(objectDataRef.current);
        canvas.current.selectedObject = [];
        canvas.current.canvas.requestRenderAll();
        valueRef.current = null;
        objectDataCloneRef.current = null;
        objectDataRef.current = null;
      } catch (err) {
        console.log("DELETE MATH ERR", err);
      }
      return;
    }
    const zoom = canvas.current.canvas.viewportTransform[0];
    let fontSize = (1 / zoom) * 50;

    if (isUpdate && objectDataRef.current?.mathData?.fontSize) {
      fontSize = objectDataRef.current?.mathData?.fontSize;
    }

    var renderOptions = {
      em: fontSize,
      ex: fontSize / 2,
      containerWidth: 1,
      display: true,
      scale: 1,
      lineWidth: 1,
    };

    const str = window?.MathJax?.tex2svg(
      value.replace("\\placeholder", ""), // remove string "\placeholder"
      renderOptions
    );
    var svg = str.firstElementChild;
    svg.setAttribute("width", null);
    svg.setAttribute("height", null);
    svg.removeAttribute("style");
    svg.removeAttribute("focusable");
    svg.removeAttribute("role");
    let child = svg.outerHTML;

    const prevTop = objectDataRef.current?.top;
    const prevLeft = objectDataRef.current?.left;
    const prevScale = objectDataRef.current?.scaleX || 1;

    fabric.loadSVGFromString(child, function (object, option) {
      let shape = fabric.util.groupSVGElements(object, option);
      var canvasTransform = canvas.current.canvas.viewportTransform;

      const pointer = mapCursorPositionToCanvasPosition(
        {
          x: (window.screen.width - shape.width / 6) / 2,
          y: (window.screen.height - 500 - shape.height / 6) / 2,
        },
        canvasTransform
      );

      shape.top = pointer.y;
      shape.left = pointer.x;
      // shape.top = prevTop || pointer.y
      // shape.left = prevLeft || pointer.x
      shape.scaleX = prevScale !== 1 ? prevScale : 1 / 6;
      shape.scaleY = prevScale !== 1 ? prevScale : 1 / 6;

      shape.mathData = {
        id: `math-${uuidv4()}`,
        value: replacePlaceHolder,
        fontSize,
      };

      if (isUpdate) {
        canvas.current?.canvas.remove(objectDataRef.current);
        canvas.current.selectedObject = [];
      }
      canvas.current.canvas.add(shape);
      canvas.current.canvas.setActiveObject(shape);
      // canvas.current?.selectListener([shape])
      canvas.current.canvas.requestRenderAll();
      valueRef.current = null;
      objectDataCloneRef.current = null;
      objectDataRef.current = null;
      initFieldValue();
    });
  };

  const handleChange = React.useCallback((e) => {
    setValue(e.target.value);
    valueRef.current = e.target.value;
    handleCreateNewMath(e.target.value);
  }, []);
  const showKeyBoard = React.useCallback(() => {
    toggleViewMode(true);
    window.mathVirtualKeyboard.visible = true;
  }, []);
  const hideKeyBoard = React.useCallback(() => {
    window.mathVirtualKeyboard.visible = false;
    valueRef.current = null;
    objectDataCloneRef.current = null;
    objectDataRef.current = null;
  }, []);
  const submit = React.useCallback(() => {
    if (!openRef.current) return;
    window.mathVirtualKeyboard.visible = false;
    dispatch(setOpenMathEditor(false));
  }, []);

  const onBeforeInput = React.useCallback((e) => {
    if (e.inputType === "insertLineBreak") {
      submit();
    }
  }, []);

  const initFieldValue = () => {
    if (
      canvas.current?.selectedObject?.length === 1 &&
      !!canvas.current?.selectedObject?.[0]?.mathData?.id
    ) {
      objectDataCloneRef.current = {
        ...canvas.current?.selectedObject?.[0],
      };
      objectDataRef.current = canvas.current?.selectedObject?.[0];
      setValue(objectDataCloneRef.current?.mathData?.value);
      mathFieldRef.current.value = valueRef.current =
        objectDataCloneRef.current?.mathData?.value;
    }
  };

  React.useImperativeHandle(ref, () => ({
    submit,
  }));

  React.useEffect(() => {
    openRef.current = open;
    if (!open) {
      return;
    }
    mathFieldRef.current.oninput = handleChange;
    mathFieldRef.current.mathVirtualKeyboardPolicy = "manual";
    window.mathVirtualKeyboard.container =
      document.querySelector(".keyboard__wrap");
    window.mathVirtualKeyboard.addEventListener("hide", () => {
      console.log("hide");
    });
    mathFieldRef.current.onfocus = showKeyBoard;
    mathFieldRef.current.onsubmit = hideKeyBoard;
    mathFieldRef.current.onblur = submit;
    mathFieldRef.current.onbeforeinput = onBeforeInput;
  }, [open]);

  React.useEffect(() => {
    if (open) {
      mathFieldRef.current.blur();

      setTimeout(() => {
        valueRef.current = null;
        mathFieldRef.current.focus();
        initFieldValue();
      }, 200);
    } else {
      valueRef.current = null;
      objectDataCloneRef.current = null;
      objectDataRef.current = null;
    }
    let shadowRoot = document.querySelector(".mathfield__inner")?.shadowRoot;
    if (shadowRoot) {
      shadowRoot.querySelector(".ML__virtual-keyboard-toggle")?.remove();
    }
  }, [open]);

  return (
    <div className={"math-editor__layer " + (open ? "open" : "")}>
      <div className="math-editor__container">
        <div className="math-field__wrapper">
          {open ? (
            <math-field
              autofocus="false"
              class="mathfield__inner"
              ref={mathFieldRef}
            />
          ) : null}
        </div>
        <div className="keyboard__wrap"></div>
      </div>
    </div>
  );
};
export default React.forwardRef(MathEditor);
