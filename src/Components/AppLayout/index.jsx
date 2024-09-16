import "./styles.scss"
import React from "react"

function AppLayout(props) {
  return (
    <div className="layout__container">
      <div className="layout__top"></div>
      <div className="layout__bottom">
        <div className="layout__bottom--inner">
          <div className="layout__left"></div>
          <div className="layout__center">{props.children}</div>
          <div className="layout__right"></div>
        </div>
      </div>
    </div>
  )
}

export default AppLayout
