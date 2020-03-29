import React from 'react'
import {ItemTypes} from '../dnd/types'
import {useDrag, useDrop} from 'react-dnd'
import {playerAttackCard} from '../store/thunksAndActionCreators'
import {connect} from 'react-redux'

const Card = props => {
  const [{isDragging}, drag] = useDrag({
    item: {
      type: props.player === 'hero' ? ItemTypes.CARD : ItemTypes.ENEMY_CARD,
      card: props.card,
      inHand: props.inHand,
      player: props.player
    },
    collect: monitor => {
      return {
        isDragging: !!monitor.isDragging()
      }
    }
  })
  const [{isOver, canDrop, item}, drop] = useDrop({
    accept: props.player === 'hero' ? ItemTypes.ENEMY_CARD : ItemTypes.CARD,

    drop: () => {
      if (!props.isMyTurn) {
        //CHAT LOG OPPORTUNITY
        return console.log('it is not my turn!')
      } else if (item.card.attackOccurred) {
        // eslint-disable-next-line no-alert
        alert("This fighter can't attack until next turn")
      } else if (props.player === 'enemy' && !props.inHand && !item.inHand) {
        props.attackCard(item.card, props.card)
        console.log('logging attacker', item.card)
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      item: monitor.getItem()
    })
  })

  const {name, attack, health, imageUrl, cost} = props.card
  return (
    <div ref={drag}>
      <div
        className="card"
        ref={drop}
        style={{
          marginRight: '1vh',
          fontWeight: 'bold',
          cursor: 'move'
        }}
      >
        <img
          src="/images/card_bg.png"
          style={{visibility: 'hidden', maxWidth: '75px', marginTop: '-159%'}}
        />
        <div>
          <p
            style={{
              margin: 0,
              textAlign: 'center',
              fontSize: 10,
              color: '#fff'
            }}
          >
            {cost}
          </p>
        </div>
        <img src={imageUrl} style={{width: '11vh'}} />
        <h2
          style={{
            textAlign: 'center',
            margin: 0,
            fontSize: 8,
            color: '#fff',
            marginTop: '-.75vh'
          }}
        >
          {name}
        </h2>
        <div
          className="stats"
          style={{
            // paddingRight: '1em',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly'
          }}
        >
          <p>{attack}</p>
          <p>{health}</p>
        </div>
      </div>
    </div>
  )
}

const mapDispatch = dispatch => ({
  attackCard: (attacker, defender) =>
    dispatch(playerAttackCard(attacker, defender))
})
const mapState = state => ({
  isMyTurn: state.game.data.isMyTurn
})

export default connect(mapState, mapDispatch)(Card)
