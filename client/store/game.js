const PLAY_CARD = 'PLAY_CARD'
const DRAW_CARD = 'DRAW_CARD'
const ATTACK_CARD = 'ATTACK_CARD'
const ATTACK_HERO = 'ATTACK_HERO'
const HERO_DEAD = 'HERO_DEAD'
const GET_ALL_CARDS = 'GET_ALL_CARDS'

import engine from '../engine/index'
import Axios from 'axios'

const gotAllCards = cards => ({
  type: GET_ALL_CARDS,
  cards
})

const playedCard = (hero, card) => ({
  type: PLAY_CARD,
  hero,
  card
})
const AttackedCard = (attacker, defender) => ({
  type: ATTACK_CARD,
  attacker,
  defender
})
const AttackedHero = hero => ({
  type: ATTACK_HERO,
  hero
})
const heroDied = () => ({
  type: HERO_DEAD
})

const drewCard = (deck, card) => ({
  type: DRAW_CARD,
  card,
  deck
})

export const playCard = (hero, card) => {
  const result = engine.payCost(hero, card)
  if (result.settlers <= 0) {
    return dispatch => {
      dispatch(heroDied())
    }
  }
  return dispatch => {
    dispatch(playedCard(hero, card))
  }
}

export const getAllCards = () => {
  return async dispatch => {
    const {data: cards} = await Axios.get('/api/cards')
    dispatch(gotAllCards(cards))
  }
}

export const attackCard = (attacker, defender) => {
  const result = engine.attack(attacker, defender)
  return dispatch => {
    dispatch(AttackedCard(...result))
  }
}
export const drawCard = deck => {
  const {newDeck, card} = engine.drawCard(deck)
  return dispatch => {
    dispatch(drewCard(newDeck, card))
  }
}
export const attackHero = (attacker, hero) => {
  const result = engine.heroAttack(attacker, hero)
  if (result.settlers <= 0) {
    return dispatch => dispatch(heroDied())
  } else {
    return dispatch => {
      dispatch(AttackedHero(result))
    }
  }
}

const dummyProps7 = {
  name: 'Test',
  imageUrl: 'favicon.ico',
  attack: 1,
  health: 4,
  cost: 1,
  id: 7
}

const dummyProps8 = {
  name: 'Test',
  imageUrl: 'favicon.ico',
  attack: 1,
  health: 4,
  cost: 1,
  id: 8
}

const dummyProps9 = {
  name: 'Test',
  imageUrl: 'favicon.ico',
  attack: 1,
  health: 4,
  cost: 1,
  id: 10
}
const dummyProps10 = {
  name: 'Test',
  imageUrl: 'favicon.ico',
  attack: 1,
  health: 4,
  cost: 1,
  id: 9
}

const defaultGame = {
  player: {
    deck: [],
    inPlay: [],
    hand: [],
    settlers: 10
  },
  enemy: {
    inPlay: [dummyProps9, dummyProps8],
    hand: [dummyProps7, dummyProps10],
    settlers: 10
  },
  isFinished: false
}

export default function(state = defaultGame, action) {
  switch (action.type) {
    case PLAY_CARD:
      return {
        ...state,
        player: {
          ...state.player,
          inPlay: [...state.player.inPlay, action.card],
          hand: state.player.hand.filter(function(card) {
            return card._id !== action.card._id
          }),
          settlers: action.hero.settlers
        }
      }
    case DRAW_CARD:
      return {
        ...state,
        player: {
          ...state.player,
          deck: action.deck,
          hand: [...state.player.hand, action.card]
        }
      }
    case ATTACK_CARD:
      return {
        ...state,
        player: {
          ...state.player,
          inPlay: state.player.inPlay
            .filter(card => card.health > 0)
            .map(card => {
              if (card._id === action.attacker._id) {
                return action.attacker
              } else {
                return card
              }
            })
        },
        enemy: {
          ...state.enemy,
          inPlay: state.enemy.inPlay
            .filter(card => card.health > 0)
            .map(card => {
              if (card.id === action.defender.id) {
                return action.defender
              } else {
                return card
              }
            })
        }
      }
    case ATTACK_HERO:
      return {...state, enemy: {...state.enemy, settlers: action.hero.settlers}}
    case HERO_DEAD:
      return {...state, isFinished: true}
    case GET_ALL_CARDS:
      return {...state, player: {...state.player, deck: action.cards}}
    default:
      return state
  }
}
