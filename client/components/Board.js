import React from 'react'
import Side from './Side'
import {DndProvider} from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

const dummyProps = {
  name: 'Test',
  imageUrl: '/images/monsters/1.png',
  attack: 1,
  defense: 4,
  id: 1
}
const dummyProps2 = {
  name: 'Test',
  imageUrl: '/images/monsters/3.png',
  attack: 1,
  defense: 4,
  id: 2
}
const dummyProps3 = {
  name: 'Test',
  imageUrl: '/images/monsters/4.png',
  attack: 1,
  defense: 4,
  id: 3
}
const dummyProps4 = {
  name: 'Test',
  imageUrl: '/images/monsters/2.png',
  attack: 1,
  defense: 4,
  id: 4
}

const enemySide = {
  inPlay: [
    {...dummyProps, id: 10},
    {...dummyProps3, id: 11}
  ],
  hand: [{...dummyProps, id: 14}],
  heroUrl: '/images/monsters/11.png'
}
const playerSide = {
  inPlay: [dummyProps3, dummyProps4],
  hand: [dummyProps, dummyProps2],
  heroUrl: '/images/monsters/14.png'
}
const Board = props => {
  return (
    <DndProvider backend={Backend}>
      <div className="board">
        ENEMY SIDE:
        <Side side={enemySide} top={true} />
        PLAYER SIDE:
        <button type="button">End Turn</button>
        <Side side={playerSide} />
      </div>
    </DndProvider>
  )
}

export default Board