import React, { useRef } from "react"
import { MathfieldElement } from "mathlive"
const useFomularField = (className, id, onChange) => {
  const mathFieldRef = React.useRef(new MathfieldElement({}))

  React.useEffect(() => {
    mathFieldRef.current.className = className
    mathFieldRef.current.id = id
    mathFieldRef.current.oninput = () => onChange(mathFieldRef.current.value)
  }, [])

  return mathFieldRef
}
export default useFomularField
