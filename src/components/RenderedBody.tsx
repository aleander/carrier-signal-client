import React from "react"

import { Body, Bounds } from "types"
import CanvasContext from "./CanvasContext"

export interface RenderedBodyProps {
  body: Body
  bounds: Bounds
  actualBounds: Bounds
}

function RenderedBody({ body, bounds, actualBounds } : RenderedBodyProps): JSX.Element {
  const context = React.useContext(CanvasContext)
  if (context === null) {
    return
  }

  const xScale = actualBounds.width / bounds.width
  const yScale = actualBounds.height / bounds.width

  context.save()
  context.scale(xScale, yScale)
  context.translate(-bounds.minX, -bounds.minY)
  context.fillStyle = "white"
  context.beginPath()
  context.ellipse(body.x, body.y, 1 / xScale, 1 / yScale, 0, 0, Math.PI * 2)
  context.fill()
  context.restore()

  return null
}

export default RenderedBody
