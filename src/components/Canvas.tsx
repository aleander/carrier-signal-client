import React from "react"

import CanvasContext from "./CanvasContext"

export interface SystemCanvasProps {
  height: number,
  width: number,
  children?: JSX.Element[]
}

function SystemCanvas({ height, width, children }: SystemCanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [context, setContext] = React.useState<CanvasRenderingContext2D>(null)

  React.useEffect(() => {
    const context = canvasRef.current.getContext("2d")
    context.save()
    context.fillStyle = "black"
    context.fillRect(0, 0, width, height)
    context.restore()
    setContext(context)
  })

  return (<div>
    <CanvasContext.Provider value={ context }>
      <canvas width={width} height={height} ref={canvasRef} style={{ width, height }} />
      {children}
    </CanvasContext.Provider>
  </div>
  )
}

export default SystemCanvas
