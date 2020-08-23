import React, { useEffect } from "react"

import { FrameContext } from "./Canvas"

interface AnimationProxyProps<T> {
  things: T[],
  factory: (thing: T) => JSX.Element
}

function AnimationProxy<T>({ things, factory }: AnimationProxyProps<T>) {
  const frameCount = React.useContext(FrameContext)
  const [keptThings, setKeptThings] = React.useState<T[]>([])

  useEffect(() => {
    setKeptThings(things)
  }, [frameCount])

  return <>{keptThings.map((thing) => factory(thing))}</>
}

export default AnimationProxy
