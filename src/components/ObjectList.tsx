import React from "react"

import { Object } from "@app/types"

export interface ObjectListProps {
  objects: Object[]
}

function ObjectList({ objects }: ObjectListProps) {
  return (<ul>
    {objects.map((o) => <li key={o.id}>{o.name} @ ({o.x}, {o.y}, {o.z}) </li>)}
  </ul>)
}

export default ObjectList
