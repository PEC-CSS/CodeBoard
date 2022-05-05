import React from 'react'
import ReactMegaMenu from "react-mega-menu"
function Check() {
  return (
    <div>
      <ReactMegaMenu
        tolerance={50}      // optional, defaults to 100
        direction={"LEFT"}  // optional, defaults to "RIGHT", takes in "RIGHT" || "LEFT"
      // styleConfig={...}   // defaults to an empty object. not recommended to be left blank.
      // onExit={() => {...}}  // a function to be called when a mouse leaves the container
      // data={[...]}        // array of data to be rendered
      />
    </div>
  )
}

export default Check
