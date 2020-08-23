import React, { useEffect, useState } from "react"

import { Body, Bounds, Message } from "@app/types"
import Canvas from "./Canvas"
import Client from "@app/client"
import RenderedBody from "./RenderedBody"

function Home() {
  const [bodies, setBodies] = useState<Body[]>([])
  const [iteration, setIteration] = useState(0)
  const [messageCount, setMessageCount] = useState(0)
  const [client, setClient] = useState<Client|null>(null)
  const [bounds, setBounds] = useState<Bounds>(new Bounds(0, 0, 30, 30))

  const handleMessage = (msg: Message) => {
    setBodies(msg.objects)
    setIteration(msg.iteration)
    setMessageCount((mc) => mc + 1)
  }

  useEffect(() => {
    const client = new Client(handleMessage)
    setClient(client)

    return () => {
      client.close()
    }
  }, [])

  useEffect(() => {
    if (client) {
      client.ready()
    }
  }, [client, messageCount])

  useEffect(() => {
    setBounds((bounds) => bodies.reduce(
      (bounds, obj) => new Bounds(
        Math.min(obj.x, bounds.minX),
        Math.min(obj.y, bounds.minY),
        Math.max(obj.x, bounds.maxX),
        Math.max(obj.y, bounds.maxY)), bounds))
  }, [bodies])

  const actualBounds = new Bounds(0, 0, 300, 300)

  return (
    <>
      <h1>Hello, World!</h1>
      <p>Iteration: { iteration }, message count: { messageCount }, nObjects: { bodies.length }.</p>
      <Canvas height={actualBounds.height} width={actualBounds.width}>
        {bodies.map((body) => <RenderedBody
          key={body.id}
          body={body}
          bounds={bounds}
          actualBounds={actualBounds}
        />)}
      </Canvas>
    </>
  )
}

export default Home
