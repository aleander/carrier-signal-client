import { Message } from "@app/types"

export type MessageHandler = (msg: Message) => void

class Client {
  private ws: WebSocket
  private handler: MessageHandler
  private socketReady: boolean
  private clientReady: boolean

  constructor(handler: MessageHandler) {
    this.ws = new WebSocket("ws://localhost:3030/state")
    this.handler = handler
    this.socketReady = false
    this.clientReady = false

    this.ws.onopen = () => {
      console.log("Open")
      this.socketReady = true
      this.demand()
    }
    this.ws.onmessage = (ev: MessageEvent) => this.handle(ev)
  }

  close() {
    this.ws.close()
  }

  ready() {
    this.clientReady = true
    this.demand()
  }

  private demand() {
    if (this.socketReady && this.clientReady) {
      this.ws.send("MOAR")
    }
  }

  private handle(ev: MessageEvent) {
    if (!this.clientReady) {
      return
    }

    const msg: Message = JSON.parse(ev.data)
    this.clientReady = false

    this.handler(msg)
  }
}

export default Client
