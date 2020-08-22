import React, { useState, useEffect } from "react"

import { Message, Object } from "@app/types"
import Client from "@app/client"
import ObjectList from "./ObjectList"

function Home() {
  const [objects, setObjects] = useState<Object[]>([])
  const [iteration, setIteration] = useState(0)
  const [messageCount, setMessageCount] = useState(0)
  const [client, setClient] = useState<Client|null>(null)

  const handleMessage = (msg: Message) => {
    setObjects(msg.objects)
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

  return (
    <>
      <h1>Hello, World!</h1>
      <p>Iteration: { iteration }, message count: { messageCount }.</p>
      <ObjectList objects={objects} />
    </>
  )
}

export default Home
