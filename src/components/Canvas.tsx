import React from "react"

import CanvasContext from "./CanvasContext"

export const FrameContext = React.createContext(0)

export interface SystemCanvasProps {
  height: number,
  width: number,
  children?: JSX.Element[] | JSX.Element
}

function SystemCanvas({ height, width, children }: SystemCanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [context, setContext] = React.useState<CanvasRenderingContext2D>(null)
  const [frameCount, setFrameCount] = React.useState(0)

  React.useEffect(() => {
    if (canvasRef.current != null) {
      const context = canvasRef.current.getContext("2d")
      setContext(context)
    }
  }, [canvasRef.current])

  React.useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setFrameCount(frameCount + 1)
    })
    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [frameCount])

  if (context != null) {
    context.save()
    context.fillStyle = "black"
    context.fillRect(0, 0, width, height)
    context.restore()
  }

  return (<div>
    <CanvasContext.Provider value={ context }>
      <FrameContext.Provider value={ frameCount }>
        <canvas width={width} height={height} ref={canvasRef} style={{ width, height }} />
        {children}
      </FrameContext.Provider>
    </CanvasContext.Provider>
  </div>
  )
}

export default SystemCanvas
