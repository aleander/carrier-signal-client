export interface Object {
  name: string,
  id: number,
  x: number,
  y: number,
  z: number
}

export interface Message {
  iteration: number,
  objects: Object[]
}
