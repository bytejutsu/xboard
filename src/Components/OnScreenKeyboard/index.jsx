import React, { useState } from "react"
import Keyboard from "react-simple-keyboard"
import inputMask from "simple-keyboard-input-mask"

import "react-simple-keyboard/build/css/index.css"
import "./styles.scss"

const OnScreenKeyboard = (
  {
    show = false,
    onChange,
    maxLength = null,
    hasNumberInputMask = false,
    inputMaskTargetClass = "",
    setValue = () => {}
  },
  ref
) => {
  const keyboardRef = React.useRef()
  const [layoutName, setLayoutName] = useState("default")
  const handleOnChange = (inp) => {
    onChange(inp)
  }
  const handleOnKeyPress = (button) => {
    if (button === "{shift}" || button === "{lock}") handleShift()
  }
  const handleShift = () => {
    setLayoutName(layoutName === "default" ? "shift" : "default")
  }
  const setKeyboardValue = (value) => {
    keyboardRef.current.setInput(value)
  }

  React.useImperativeHandle(ref, () => ({
    setKeyboardValue
  }))

  if (hasNumberInputMask) {
    return (
      <div className={"keyboard__container " + (show ? "show" : "")}>
        <Keyboard
          keyboardRef={(r) => {
            keyboardRef.current = r
          }}
          theme={"hg-theme-default myTheme1"}
          onKeyPress={handleOnKeyPress}
          onChange={handleOnChange}
          layoutName={layoutName}
          maxLength={maxLength}
          inputMaskTargetClass={inputMaskTargetClass}
          modules={[inputMask]}
          inputMaskPhysicalKeyboardHandling={true}
          inputMask={{
            default: {
              mask: "999",
              regex: /^[0-9]+$/
            }
          }}
        />
      </div>
    )
  }

  return (
    <div className={"keyboard__container " + (show ? "show" : "")}>
      <Keyboard
        keyboardRef={(r) => {
          keyboardRef.current = r
        }}
        theme={"hg-theme-default myTheme1"}
        onKeyPress={handleOnKeyPress}
        onChange={handleOnChange}
        layoutName={layoutName}
        maxLength={maxLength}
      />
    </div>
  )
}
export default React.forwardRef(OnScreenKeyboard)
