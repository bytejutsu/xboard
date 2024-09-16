import React from "react"
import { useRouteError } from "react-router-dom"

const NotFound = () => {
  const error = useRouteError()
  console.log("ROUTER ERROR", error)
  return <div>404 NotFound</div>
}

export default NotFound
