export interface Body {
  name: string,
  id: number,
  x: number,
  y: number,
  z: number
}

export interface Message {
  iteration: number,
  objects: Body[]
}

export class Bounds {
  minX: number
  minY: number
  maxX: number
  maxY: number

  constructor(minX: number, minY: number, maxX: number, maxY: number) {
    this.minX = minX
    this.minY = minY
    this.maxX = maxX
    this.maxY = maxY
  }

  get width() { return this.maxX - this.minX }
  get height() { return this.maxY - this.minY }
}
