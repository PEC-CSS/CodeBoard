import React from 'react'
import {Split} from '@geoffcox/react-splitter'

function Check() {
  return (
      <div>

          <Split >
                <div style = {{border:'1ps solid black'}}>This is one page</div>
                <div>This is another page</div>
          </Split>
      </div>
  )
}

export default Check